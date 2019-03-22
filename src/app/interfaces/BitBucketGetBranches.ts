declare module BitBucketGetBranches {

    export interface Commits {
        href: string;
    }

    export interface Self {
        href: string;
    }

    export interface Html {
        href: string;
    }

    export interface Links {
        commits: Commits;
        self: Self;
        html: Html;
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

    export interface Repository {
        links: Links2;
        type: string;
        name: string;
        full_name: string;
        uuid: string;
    }

    export interface Self3 {
        href: string;
    }

    export interface Comments {
        href: string;
    }

    export interface Patch {
        href: string;
    }

    export interface Html3 {
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

    export interface Links3 {
        self: Self3;
        comments: Comments;
        patch: Patch;
        html: Html3;
        diff: Diff;
        approve: Approve;
        statuses: Statuses;
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

    export interface User {
        username: string;
        display_name: string;
        account_id: string;
        links: Links4;
        nickname: string;
        type: string;
        uuid: string;
    }

    export interface Author {
        raw: string;
        type: string;
        user: User;
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

    export interface Parent {
        hash: string;
        type: string;
        links: Links5;
    }

    export interface Target {
        hash: string;
        repository: Repository;
        links: Links3;
        author: Author;
        parents: Parent[];
        date: Date;
        message: string;
        type: string;
    }

    export interface Value {
        name: string;
        links: Links;
        default_merge_strategy: string;
        merge_strategies: string[];
        type: string;
        target: Target;
    }

    export interface RootObject {
        pagelen: number;
        size: number;
        values: Value[];
        page: number;
        next: string;
    }

}

