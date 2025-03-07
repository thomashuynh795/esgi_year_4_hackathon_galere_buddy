export enum Role {
  ADMIN = "ADMIN",
  MEMBER = "MEMBER",
}

export enum ReactType {
  LIKE = "LIKE",
  LAUGH = "LAUGH",
  CRY = "CRY",
}

export interface User {
  id: string;
  email: string;
  password: string;
  firstname: string;
  name: string;
  avatarUrl?: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
  posts: IPost[];
  comments: Comment[];
  reactions: Reaction[];
  bookmarks: Bookmark[];
}

export interface IPost {
  id: string;
  title: string;
  imageUrl?: string;
  problem: string;
  solution?: string;
  advice: string;
  lesson?: string;
  createdAt: Date;
  updatedAt: Date;
  authorId: string;
  author: User;
  comments: Comment[];
  reactions: Reaction[];
  tags: PostTag[];
  bookmarks: Bookmark[];
}

export interface NewPost {
  title: string;
  imageUrl?: string;
  problem: string;
  solution?: string;
  advice: string;
  lesson?: string;
}

export interface Comment {
  id: string;
  content: string;
  postId: string;
  authorId: string;
  createdAt: Date;
  post: IPost;
  author: User;
}

export interface Reaction {
  id: string;
  postId: string;
  userId: string;
  react: ReactType;
  createdAt: Date;
  post: IPost;
  user: User;
}

export interface Bookmark {
  id: string;
  postId: string;
  userId: string;
  createdAt: Date;
  post: IPost;
  user: User;
}

export interface Tag {
  id: string;
  name: string;
  posts: PostTag[];
}

export interface PostTag {
  postId: string;
  tagId: string;
  post: IPost;
  tag: Tag;
}
