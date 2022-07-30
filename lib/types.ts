import { Like, User, Comment } from '../generated/graphql';

export interface IUser {
  id: string;
  name?: string;
  username?: string;
  phone?: string;
  address?: string;
  website?: string;
  bio?: string;
  email: string;
  image?: string;
  isAdmin: boolean;
  // posts: Post[];
  // likes: Like[];
  // followers: User[];
  // following: User[];
}

interface ILike {
  _typename?: 'Like';
  id: string;
  userId: string;
  postId: string;
}
interface IiUser {
  _typename?: 'User';
  id: string;
  name?: string;
  email?: string;
  username?: string;
  image?: string;
}

interface IComment {
  __typename?: 'Comment';
  id: string;
  content: string;
  user?: IiUser;
  postId: string;
  userId: string;
}
export interface Post {
  __typename?: 'Post';
  id: string;
  caption?: string;
  images?: string[];
  publicId?: string[];
  userId: string;
  createdAt: string;
  user: IiUser;
  likes: ILike[];
  comments: IComment[];
}
export interface IPost {
  __typename: 'Post';
  id: string;
  caption?: string;
  images?: string[];
  publicId?: string[];
  userId: string;
  createdAt: string;
  user: IiUser;
  likes: ILike[];
  comments: IComment[];
}

// {
//   "__typename": "Post",
//   "id": "28CtRDm",
//   "caption": "notion",
//   "images": [
//       "https://res.cloudinary.com/mamsheikh/image/upload/v1658929948/prismagram/pplb0w4cn7wcpbc1u2tt.png"
//   ],
//   "publicId": [
//       "pplb0w4cn7wcpbc1u2tt"
//   ],
//   "createdAt": "2022-07-27T13:52:35.619Z",
//   "userId": "1tB1JvKJE4",
//   "likes": [
//       {
//           "__typename": "Like",
//           "id": "cl63uupq31175r8dyw73dx5aj",
//           "userId": "1tB1JvKJE4",
//           "postId": "28CtRDm"
//       }
//   ],
//   "user": {
//       "__typename": "User",
//       "id": "1tB1JvKJE4",
//       "name": "Munir Ali Mohammed",
//       "email": "bob@gmail.com",
//       "username": "bob",
//       "image": "https://res.cloudinary.com/mamsheikh/image/upload/v1659016640/prismagram/zlp7gtnkhkffawapb0dg.jpg"
//   },
//   "comments": [
//       {
//           "__typename": "Comment",
//           "id": "CGFV3gf",
//           "content": "what is this notion",
//           "postId": "28CtRDm",
//           "userId": "1tB1JvKJE4"
//       },
//       {
//           "__typename": "Comment",
//           "id": "rPTBAoN",
//           "content": "alright, keep your secrets then",
//           "postId": "28CtRDm",
//           "userId": "1tB1JvKJE4"
//       }
//   ]
// }
