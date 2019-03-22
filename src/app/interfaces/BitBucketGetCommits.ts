declare module BitBucketGetCommits {  
  export interface RootObject {
    pagelen: number;
    values: Value[];
    next: string;
  }
  
  export interface Value {
    rendered: Rendered;
    hash: string;
    repository: Repository;
    links: Links2;
    author: Author;
    summary: Message;
    parents: Parent[];
    date: string;
    message: string;
    type: string;
  }
  
  export interface Parent {
    hash: string;
    type: string;
    links: Links3;
  }
  
  export interface Links3 {
    self: Self;
    html: Self;
  }
  
  export interface Author {
    raw: string;
    type: string;
    user?: User;
  }
  
  export interface User {
    username: string;
    display_name: string;
    account_id: string;
    links: Links;
    nickname: string;
    type: string;
    uuid: string;
  }
  
  export interface Links2 {
    self: Self;
    comments: Self;
    patch?: Self;
    html: Self;
    diff: Self;
    approve: Self;
    statuses: Self;
  }
  
  export interface Repository {
    links: Links;
    type: string;
    name: string;
    full_name: string;
    uuid: string;
  }
  
  export interface Links {
    self: Self;
    html: Self;
    avatar: Self;
  }
  
  export interface Self {
    href: string;
  }
  
  export interface Rendered {
    message: Message;
  }
  
  export interface Message {
    raw: string;
    markup: string;
    html: string;
    type: string;
  }
}