declare module BitBucketGetPullRequests {

    export interface Self {
        href: string;
    }

    export interface Html {
        href: string;
    }

    export interface Links {
        self: Self;
        html: Html;
    }

    export interface Value {
        type: string;
        id: number;
        links: Links;
        title: string;
    }

    export interface RootObject {
        values: Value[];
        type: string;
        page: number;
        pagelen: number;
    }

}

