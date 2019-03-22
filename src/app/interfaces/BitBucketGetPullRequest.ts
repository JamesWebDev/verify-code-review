declare module BitBucketGetPullRequest {

    export interface Description {
        raw: string;
        markup: string;
        html: string;
        type: string;
    }

    export interface Title {
        raw: string;
        markup: string;
        html: string;
        type: string;
    }

    export interface Rendered {
        description: Description;
        title: Title;
    }

    export interface Decline {
        href: string;
    }

    export interface Commits {
        href: string;
    }

    export interface Self {
        href: string;
    }

    export interface Comments {
        href: string;
    }

    export interface Merge {
        href: string;
    }

    export interface Html {
        href: string;
    }

    export interface Activity {
        href: string;
    }

    export interface Diff {
        href: string;
    }

    export interface Approve {
        href: string;
    }

    export interface Statuses {
        href: string;
    }

    export interface Links {
        decline: Decline;
        commits: Commits;
        self: Self;
        comments: Comments;
        merge: Merge;
        html: Html;
        activity: Activity;
        diff: Diff;
        approve: Approve;
        statuses: Statuses;
    }

    export interface Self2 {
        href: string;
    }

    export interface Html2 {
        href: string;
    }

    export interface Avatar {
        href: string;
    }

    export interface Links2 {
        self: Self2;
        html: Html2;
        avatar: Avatar;
    }

    export interface Reviewer {
        username: string;
        display_name: string;
        account_id: string;
        links: Links2;
        nickname: string;
        type: string;
        uuid: string;
    }

    export interface Self3 {
        href: string;
    }

    export interface Html3 {
        href: string;
    }

    export interface Links3 {
        self: Self3;
        html: Html3;
    }

    export interface Commit {
        hash: string;
        type: string;
        links: Links3;
    }

    export interface Self4 {
        href: string;
    }

    export interface Html4 {
        href: string;
    }

    export interface Avatar2 {
        href: string;
    }

    export interface Links4 {
        self: Self4;
        html: Html4;
        avatar: Avatar2;
    }

    export interface Repository {
        links: Links4;
        type: string;
        name: string;
        full_name: string;
        uuid: string;
    }

    export interface Branch {
        name: string;
    }

    export interface Destination {
        commit: Commit;
        repository: Repository;
        branch: Branch;
    }

    export interface Summary {
        raw: string;
        markup: string;
        html: string;
        type: string;
    }

    export interface Self5 {
        href: string;
    }

    export interface Html5 {
        href: string;
    }

    export interface Links5 {
        self: Self5;
        html: Html5;
    }

    export interface Commit2 {
        hash: string;
        type: string;
        links: Links5;
    }

    export interface Self6 {
        href: string;
    }

    export interface Html6 {
        href: string;
    }

    export interface Avatar3 {
        href: string;
    }

    export interface Links6 {
        self: Self6;
        html: Html6;
        avatar: Avatar3;
    }

    export interface Repository2 {
        links: Links6;
        type: string;
        name: string;
        full_name: string;
        uuid: string;
    }

    export interface Branch2 {
        name: string;
    }

    export interface Source {
        commit: Commit2;
        repository: Repository2;
        branch: Branch2;
    }

    export interface Self7 {
        href: string;
    }

    export interface Html7 {
        href: string;
    }

    export interface Avatar4 {
        href: string;
    }

    export interface Links7 {
        self: Self7;
        html: Html7;
        avatar: Avatar4;
    }

    export interface User {
        username: string;
        display_name: string;
        account_id: string;
        links: Links7;
        nickname: string;
        type: string;
        uuid: string;
    }

    export interface Participant {
        role: string;
        participated_on: Date;
        type: string;
        approved: boolean;
        user: User;
    }

    export interface Self8 {
        href: string;
    }

    export interface Html8 {
        href: string;
    }

    export interface Avatar5 {
        href: string;
    }

    export interface Links8 {
        self: Self8;
        html: Html8;
        avatar: Avatar5;
    }

    export interface Author {
        username: string;
        display_name: string;
        account_id: string;
        links: Links8;
        nickname: string;
        type: string;
        uuid: string;
    }

    export interface Self9 {
        href: string;
    }

    export interface Html9 {
        href: string;
    }

    export interface Links9 {
        self: Self9;
        html: Html9;
    }

    export interface MergeCommit {
        hash: string;
        type: string;
        links: Links9;
    }

    export interface Self10 {
        href: string;
    }

    export interface Html10 {
        href: string;
    }

    export interface Avatar6 {
        href: string;
    }

    export interface Links10 {
        self: Self10;
        html: Html10;
        avatar: Avatar6;
    }

    export interface ClosedBy {
        username: string;
        display_name: string;
        account_id: string;
        links: Links10;
        nickname: string;
        type: string;
        uuid: string;
    }

    export interface RootObject {
        rendered: Rendered;
        type: string;
        description: string;
        links: Links;
        title: string;
        close_source_branch: boolean;
        reviewers: Reviewer[];
        id: number;
        destination: Destination;
        created_on: Date;
        summary: Summary;
        source: Source;
        comment_count: number;
        state: string;
        task_count: number;
        participants: Participant[];
        reason: string;
        updated_on: Date;
        author: Author;
        merge_commit: MergeCommit;
        closed_by: ClosedBy;
    }

}

