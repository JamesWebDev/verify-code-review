declare module BitBucketGetTeams {

    export interface Hooks {
        href: string;
    }

    export interface Self {
        href: string;
    }

    export interface Repositories {
        href: string;
    }

    export interface Html {
        href: string;
    }

    export interface Followers {
        href: string;
    }

    export interface Avatar {
        href: string;
    }

    export interface Members {
        href: string;
    }

    export interface Following {
        href: string;
    }

    export interface Projects {
        href: string;
    }

    export interface Snippets {
        href: string;
    }

    export interface Links {
        hooks: Hooks;
        self: Self;
        repositories: Repositories;
        html: Html;
        followers: Followers;
        avatar: Avatar;
        members: Members;
        following: Following;
        projects: Projects;
        snippets: Snippets;
    }

    export interface Properties {
    }

    export interface Value {
        website: string;
        username: string;
        display_name: string;
        has_2fa_enabled?: any;
        links: Links;
        created_on: Date;
        location?: any;
        type: string;
        properties: Properties;
        uuid: string;
    }

    export interface RootObject {
        pagelen: number;
        values: Value[];
        page: number;
        size: number;
        next: string;
    }

}