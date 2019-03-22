declare module BitBucketGetRepos {

    export interface Watchers {
        href: string;
    }

    export interface Branches {
        href: string;
    }

    export interface Tags {
        href: string;
    }

    export interface Commits {
        href: string;
    }

    export interface Clone {
        href: string;
        name: string;
    }

    export interface Self {
        href: string;
    }

    export interface Source {
        href: string;
    }

    export interface Html {
        href: string;
    }

    export interface Avatar {
        href: string;
    }

    export interface Hooks {
        href: string;
    }

    export interface Forks {
        href: string;
    }

    export interface Downloads {
        href: string;
    }

    export interface Pullrequests {
        href: string;
    }

    export interface Links {
        watchers: Watchers;
        branches: Branches;
        tags: Tags;
        commits: Commits;
        clone: Clone[];
        self: Self;
        source: Source;
        html: Html;
        avatar: Avatar;
        hooks: Hooks;
        forks: Forks;
        downloads: Downloads;
        pullrequests: Pullrequests;
    }

    export interface Self2 {
        href: string;
    }

    export interface Html2 {
        href: string;
    }

    export interface Avatar2 {
        href: string;
    }

    export interface Links2 {
        self: Self2;
        html: Html2;
        avatar: Avatar2;
    }

    export interface Project {
        key: string;
        type: string;
        uuid: string;
        links: Links2;
        name: string;
    }

    export interface Mainbranch {
        type: string;
        name: string;
    }

    export interface Self3 {
        href: string;
    }

    export interface Html3 {
        href: string;
    }

    export interface Avatar3 {
        href: string;
    }

    export interface Links3 {
        self: Self3;
        html: Html3;
        avatar: Avatar3;
    }

    export interface Owner {
        username: string;
        display_name: string;
        type: string;
        uuid: string;
        links: Links3;
    }

    export interface Value {
        scm: string;
        website: string;
        has_wiki: boolean;
        uuid: string;
        links: Links;
        fork_policy: string;
        name: string;
        project: Project;
        language: string;
        created_on: Date;
        mainbranch: Mainbranch;
        full_name: string;
        has_issues: boolean;
        owner: Owner;
        updated_on: Date;
        size: number;
        type: string;
        slug: string;
        is_private: boolean;
        description: string;
    }

    export interface RootObject {
        pagelen: number;
        size: number;
        values: Value[];
        page: number;
        next: string;
    }

}

