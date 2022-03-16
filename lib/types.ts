import { Like } from '../generated/graphql';

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
  caption: string;
  images: string[];
  user: IUser;
  userId: String;
}
