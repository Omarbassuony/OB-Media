export interface IPost {
  _id: string;
  id: string;
  body?: string;
  image?: string;
  privacy: string;
  user: IUser;
  createdAt: string;
  commentsCount: number;
  topComment: IComment | null;
  likesCount: number;
  likes: string[];
  sharesCount: number;
  isShare: boolean;
  bookmarked: boolean;
}

export interface IUser {
  _id: string;
  name: string;
  username: string;
  photo: string;
}

export interface IComment {
  _id: string;
  content: string;
  commentCreator: IUser;
  post: string;
  parentComment: string | null;
  likes: string[];
  createdAt: string;
}
