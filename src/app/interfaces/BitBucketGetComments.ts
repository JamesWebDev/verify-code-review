declare module BitBucketGetComments {

    export interface Content {
        raw: string;
        markup: string;
        html: string;
        type: string;
    }

    export interface User {
        display_name: string;
    }

    export interface Value {
        deleted: boolean;
        content: Content;
        user: User;
    }

    export interface RootObject {
        pagelen: number;
        values: Value[];
        page: number;
        size: number;
        next: string;
    }

}