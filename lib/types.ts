import { Comment, User, Like } from '../generated/graphql';

export interface IUser {
  id: string;
  name: string;
  username: string;
  phone: string;
  address: string;
  website: string;
  bio: string;
  email: string;
  emailVerified: string;
  image: string;
  isAdmin: boolean;
  posts: Post[];
  likes: Like[];
  followers: IUser[];
  following: IUser[];
}

export interface Post {
  id: string;
  caption?: string | null;
  images?: string[];
  publicId?: string[];
  userId: string;
  createdAt: string;
  user: User | null;
  likes: Like[] | null;
  comments: Comment[] | null;
}
