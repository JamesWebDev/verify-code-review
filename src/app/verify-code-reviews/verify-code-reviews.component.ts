import { Component, OnInit, ViewChild } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {MatTable} from '@angular/material';
import '../interfaces/BitBucketGetTeams';
import {FormControl, Validators} from '@angular/forms';


interface ICommitAnalysis {
    Hash:string,
    PartOfPullRequest:string;
    PartOfPullRequestId:number;
    Message:string;
    PullRequestIssuesFound:string;
}

@Component({
  selector: 'app-verify-code-reviews',
  templateUrl: './verify-code-reviews.component.html',
  styleUrls: ['./verify-code-reviews.component.scss']
})
export class VerifyCodeReviewsComponent implements OnInit {

    userName: string = '';
    password: string = '';
    teamControl = new FormControl('',[Validators.required]);
    team: BitBucketGetTeams.Value;
    searchForRepoSlug: string;
    getReposResponse: BitBucketGetRepos.RootObject;
    getTeamsResponse: BitBucketGetTeams.RootObject;
    loadMoreReposUrl: string;
    selectedRepo: BitBucketGetRepos.Value;    
    lastHash: string = '';
    releaseHash: string = '';
    commitsInTheRelease:ICommitAnalysis[] = [];
    displayedColumns=['Hash','PartOfPullRequest','Message','PullRequestIssuesFound']
    @ViewChild(MatTable) table: MatTable<ICommitAnalysis>;

    constructor(public http: HttpClient) { }

    ngOnInit() {
        let name = this.getCookie('userName');
        this.userName = name;
        let password = this.getCookie('password');
        this.password = password;
        let team = this.getCookie('team');     
        console.log('team',team); 
        
        if(team){
          this.team=team&&JSON.parse(team);
          this.getTeamsResponse = <any>{
            values:[this.team]
          }
        }        
    }
    onLogClick() {
        console.log('UserName', this.userName);
        console.log('SearchForRepoSlug', this.searchForRepoSlug);
        console.log('getReposResponse', this.getReposResponse);
    }
    async getMyTeams(){
      const url = `https://api.bitbucket.org/2.0/teams?role=member`
      let response = await this.makeApiCallToBitBucket<BitBucketGetTeams.RootObject>(url);  
      while(response.next){
          let more = await this.makeApiCallToBitBucket<BitBucketGetTeams.RootObject>(response.next); 
          more.values.forEach(c=>response.values.push(c));
          response.next = more.next;
      } 
      this.getTeamsResponse = response;
    }
    teamMatchesSelected(team1: BitBucketGetTeams.Value, team2: BitBucketGetTeams.Value){
      return team1 && team2 ? team1.uuid === team2.uuid : team1 === team2;
    }
    onTeamSelected(team: BitBucketGetTeams.Value){
      this.setCookie('team', JSON.stringify(team));
      this.team = team;
    }
    getRepos() {
        console.log('Get Repos Clicked');
        this.setCookie('userName',this.userName);
        this.setCookie('password',this.password);
        let url = `https://api.bitbucket.org/2.0/repositories/${this.team.uuid}?q=slug~"${this.searchForRepoSlug}"&sort=slug`;
        if (!this.searchForRepoSlug) {
            url = `https://api.bitbucket.org/2.0/repositories/${this.team.uuid}?sort=slug`;
        }
        
        const headerDict = {
            'Authorization': `Basic ${ btoa(this.userName + ":" + this.password)}`
        };
        const requestOptions = {
            headers: new HttpHeaders(headerDict)
        };
        this.http
            .get<BitBucketGetRepos.RootObject>(
                url,
                requestOptions)
            .subscribe((data) => {
                this.getReposResponse = data;
                if (data.next) {
                    this.loadMoreReposUrl = data.next;
                }
                console.log(this.getReposResponse);
            });
    }

    getMoreRepos() {
        console.log('Get More Repos Clicked');

        const headerDict = {
            'Authorization': `Basic ${ btoa(this.userName + ":" + this.password)}`
        };
        const requestOptions = {
            headers: new HttpHeaders(headerDict)
        };
        this.http
            .get<BitBucketGetRepos.RootObject>(
                this.loadMoreReposUrl,
                requestOptions)
            .subscribe((data) => {
                data.values.forEach(v => this.getReposResponse.values.push(v));
                if (data.next) {
                    this.loadMoreReposUrl = data.next;
                }
                console.log(data);
            });
    }

    onRepoSelected(repo: BitBucketGetRepos.Value) {
        console.log(repo);
        this.selectedRepo = repo;
    }

    async onVerifyCodeReviewsClick(){
        this.commitsInTheRelease = [];
        let url = `https://api.bitbucket.org/2.0/repositories/${this.team.uuid}/${this.selectedRepo.slug}/commits/?include=${this.releaseHash}&exclude=${this.lastHash}`;
        let response = await this.makeApiCallToBitBucket<BitBucketGetCommits.RootObject>(url);  
        while(response.next){
            let more = await this.makeApiCallToBitBucket<BitBucketGetCommits.RootObject>(response.next); 
            more.values.forEach(c=>response.values.push(c));
            response.next = more.next;
        }   
        console.log(response);   

        response.values.filter(v=>v.parents.length<2).forEach(c=>{
            this.commitsInTheRelease.push({
                Hash:c.hash.substring(0,7),
                PartOfPullRequest:'↻',
                PartOfPullRequestId:null,
                Message:this.truncate(c.message,50),
                PullRequestIssuesFound:''
            });
        });
        let x = [];
        this.commitsInTheRelease.forEach(r=>{
            x.push(this.isInPullRequest(r.Hash));
        });
        Promise.all(x).then(()=>{
            console.log(this.commitsInTheRelease,this.commitsInTheRelease.filter(y=>y.PartOfPullRequestId!=null).map(x=>x.PartOfPullRequestId).filter((v, i, a) => a.indexOf(v) === i));
            let pullRequests= this.commitsInTheRelease
                .filter(y=>y.PartOfPullRequestId!=null)
                .map(x=>x.PartOfPullRequestId)
                .filter((v, i, a) => a.indexOf(v) === i);
            console.log(`Unique Pull Request list ${pullRequests.join(',')}`)
            pullRequests.forEach(async p=>await this.checkPullRequestsForIssues(p));
        });

    }

    async isInPullRequest(commitId:string){
        console.log(`isInPullRequest called with ${commitId}`);
        let url = `https://api.bitbucket.org/2.0/repositories/${this.team.uuid}/${this.selectedRepo.slug}/commit/${commitId}/pullrequests`;
        let result = await this.makeApiCallToBitBucket<BitBucketGetPullRequests.RootObject>(url);
        if(result.values.length > 0){
            //this.commitsInTheRelease.find(c=>c.Hash===commitId).PartOfPullRequest = `✅ In Pull Request # ${result.values.map(r=>r.id).join(',')}`
            this.commitsInTheRelease.find(c=>c.Hash===commitId).PartOfPullRequest = `✅#${result.values[0].id}: ${result.values[0].title}`;
            this.commitsInTheRelease.find(c=>c.Hash===commitId).PartOfPullRequestId = result.values[0].id;
        }else{
            this.commitsInTheRelease.find(c=>c.Hash===commitId).PartOfPullRequest = '❌'
        }
        this.table.renderRows();        
    }

    async checkPullRequestsForIssues(pullRequestId:number){
        console.log(`checkPullRequestsForIssues called with ${pullRequestId}`);
        if(!pullRequestId){return;}
        let url = `https://api.bitbucket.org/2.0/repositories/${this.team.uuid}/${this.selectedRepo.slug}/pullrequests/${pullRequestId}`;
        let result = await this.makeApiCallToBitBucket<BitBucketGetPullRequest.RootObject>(url);
        console.log(result.reviewers.length,'Reviewers:'+result.reviewers.map(r=>r.username).join(','),'Author:'+result.author.username);
        if(result.reviewers.length < 1)
        {
            this.commitsInTheRelease
                .filter(c=>c.PartOfPullRequestId === pullRequestId)
                .forEach(x=>{
                    x.PullRequestIssuesFound+='❌ Pull Request had no reviewers assigned.\n'
                })
        }
        let approvers = result.participants.filter(u=>u.approved);
        let nonAuthorApprovers = approvers.filter(x=>x.user.uuid != result.author.uuid);
        if(approvers.length <1){
            this.commitsInTheRelease
                .filter(c=>c.PartOfPullRequestId === pullRequestId)
                .forEach(x=>{
                    x.PullRequestIssuesFound+='❌ Pull Request was never approved.\n'
                })
        }
        if(approvers.length >= 1 && nonAuthorApprovers.length < 1){
            this.commitsInTheRelease
                .filter(c=>c.PartOfPullRequestId === pullRequestId)
                .forEach(x=>{
                    x.PullRequestIssuesFound+='❌ Author was only person to approve the pull request.\n'
                })
        }
        if(nonAuthorApprovers.length > 0){
            let commitsUrl = `https://api.bitbucket.org/2.0/repositories/${this.team.uuid}/${this.selectedRepo.slug}/pullrequests/${pullRequestId}/commits`;
            let commitsResult = await this.makeApiCallToBitBucket<BitBucketGetCommits.RootObject>(commitsUrl);  
            console.log('commitsResult',commitsUrl,commitsResult); 

            let approvalDates = result.participants
                .filter(u=>u.approved)
                .map(p=>new Date(p.participated_on))
            console.log('approvalDates',approvalDates);
            let maxApproval=new Date(Math.max.apply(null,approvalDates));
            console.log('maxApproval',maxApproval)
            let lastCommit = commitsResult.values.find(c=>c.parents.length < 2);
           
            console.log('lastCommit',lastCommit);
            if(lastCommit&&maxApproval<new Date(lastCommit.date)){
                this.commitsInTheRelease
                .filter(c=>c.PartOfPullRequestId === pullRequestId)
                .forEach(x=>{
                    x.PullRequestIssuesFound+='❌ Commits added after request was approved.\n'
                })                
            }
        }

        this.table.renderRows();
    }    
    async makeApiCallToBitBucket<T>(url:string){
        console.log('makeApiCallToBitBucket called');

        const headerDict = {
            'Authorization': `Basic ${ btoa(this.userName + ":" + this.password)}`
        };
        const requestOptions = {
            headers: new HttpHeaders(headerDict)
        };
        return this.http.get<T>(url,requestOptions).toPromise();
    }

    truncate(value:string,n:number){
        return (value.length > n) ? value.substr(0, n-1) + '…' : value;
    }
    setCookie(name, value) {
        var d = new Date;
        d.setTime(d.getTime() + 24*60*60*1000*365);
        document.cookie = name + "=" + value + ";path=/;expires=" + d.toUTCString();
    }
    getCookie(name) {
        var v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
        return v ? v[2] : null;
    }

}