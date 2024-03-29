import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: any;
};

export type Comment = {
  __typename?: 'Comment';
  content: Scalars['String'];
  id: Scalars['String'];
  post: Post;
  postId: Scalars['String'];
  user: User;
  userId: Scalars['String'];
};

export type CreatePostInput = {
  caption?: InputMaybe<Scalars['String']>;
  images?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type CreateUserInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type Like = {
  __typename?: 'Like';
  id: Scalars['String'];
  post: Post;
  postId: Scalars['String'];
  user: User;
  userId: Scalars['String'];
};

export type LoginUserInput = {
  email_or_username: Scalars['String'];
  password: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createComment?: Maybe<Comment>;
  createPost?: Maybe<Post>;
  deleteComment?: Maybe<Comment>;
  deletePost?: Maybe<Post>;
  follow?: Maybe<User>;
  login?: Maybe<User>;
  logout?: Maybe<Scalars['Boolean']>;
  signup?: Maybe<User>;
  toggleLike?: Maybe<Like>;
  unfollow?: Maybe<User>;
  updateComment?: Maybe<Comment>;
  updatePost?: Maybe<Post>;
  updateProfile?: Maybe<User>;
};


export type MutationCreateCommentArgs = {
  content: Scalars['String'];
  postId: Scalars['String'];
};


export type MutationCreatePostArgs = {
  input: CreatePostInput;
};


export type MutationDeleteCommentArgs = {
  commentId: Scalars['String'];
};


export type MutationDeletePostArgs = {
  postId: Scalars['String'];
};


export type MutationFollowArgs = {
  id: Scalars['String'];
};


export type MutationLoginArgs = {
  input: LoginUserInput;
};


export type MutationSignupArgs = {
  input: CreateUserInput;
};


export type MutationToggleLikeArgs = {
  postId: Scalars['String'];
};


export type MutationUnfollowArgs = {
  id: Scalars['String'];
};


export type MutationUpdateCommentArgs = {
  caption: Scalars['String'];
  commentId: Scalars['String'];
};


export type MutationUpdatePostArgs = {
  input: UpdatePostInput;
};


export type MutationUpdateProfileArgs = {
  input?: InputMaybe<UpdateProfileInput>;
};

/** PageInfo cursor, as defined in https://facebook.github.io/relay/graphql/connections.htm#sec-undefined.PageInfo */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** The cursor corresponding to the last nodes in edges. Null if the connection is empty. */
  endCursor?: Maybe<Scalars['String']>;
  /** Used to indicate whether more edges exist following the set defined by the clients arguments. */
  hasNextPage: Scalars['Boolean'];
  /** Used to indicate whether more edges exist prior to the set defined by the clients arguments. */
  hasPreviousPage: Scalars['Boolean'];
  /** The cursor corresponding to the first nodes in edges. Null if the connection is empty. */
  startCursor?: Maybe<Scalars['String']>;
};

export type Post = {
  __typename?: 'Post';
  caption?: Maybe<Scalars['String']>;
  comments: Array<Maybe<Comment>>;
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  images?: Maybe<Array<Maybe<Scalars['String']>>>;
  likes: Array<Maybe<Like>>;
  publicId?: Maybe<Array<Maybe<Scalars['String']>>>;
  user: User;
  userId: Scalars['String'];
};

export type PostConnection = {
  __typename?: 'PostConnection';
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Edge-Types */
  edges?: Maybe<Array<Maybe<PostEdge>>>;
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-undefined.PageInfo */
  pageInfo: PageInfo;
};

export type PostEdge = {
  __typename?: 'PostEdge';
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Cursor */
  cursor: Scalars['String'];
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Node */
  node?: Maybe<Post>;
};

export type Query = {
  __typename?: 'Query';
  explorePosts?: Maybe<Array<Maybe<Post>>>;
  getFollowSuggestions?: Maybe<Array<Maybe<User>>>;
  getUser: User;
  me?: Maybe<User>;
  posts?: Maybe<PostConnection>;
  searchUser: Array<Maybe<User>>;
};


export type QueryGetUserArgs = {
  id: Scalars['String'];
};


export type QueryPostsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type QuerySearchUserArgs = {
  input?: InputMaybe<Scalars['String']>;
};

export type UpdatePostInput = {
  caption?: InputMaybe<Scalars['String']>;
  id: Scalars['String'];
  images?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type UpdateProfileInput = {
  address?: InputMaybe<Scalars['String']>;
  bio?: InputMaybe<Scalars['String']>;
  image?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
  username?: InputMaybe<Scalars['String']>;
  website?: InputMaybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  address?: Maybe<Scalars['String']>;
  bio?: Maybe<Scalars['String']>;
  comments: Array<Maybe<Comment>>;
  email: Scalars['String'];
  followers?: Maybe<Array<Maybe<User>>>;
  following?: Maybe<Array<Maybe<User>>>;
  id: Scalars['String'];
  image?: Maybe<Scalars['String']>;
  isAdmin: Scalars['Boolean'];
  likes: Array<Maybe<Like>>;
  name?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  posts: Array<Maybe<Post>>;
  username?: Maybe<Scalars['String']>;
  website?: Maybe<Scalars['String']>;
};

export type CreateCommentMutationVariables = Exact<{
  postId: Scalars['String'];
  content: Scalars['String'];
}>;


export type CreateCommentMutation = { __typename?: 'Mutation', createComment?: { __typename?: 'Comment', id: string, content: string, postId: string, userId: string, post: { __typename?: 'Post', caption?: string | null, images?: Array<string | null> | null, userId: string }, user: { __typename?: 'User', name?: string | null, id: string, username?: string | null, image?: string | null } } | null };

export type CreatePostMutationVariables = Exact<{
  input: CreatePostInput;
}>;


export type CreatePostMutation = { __typename?: 'Mutation', createPost?: { __typename?: 'Post', id: string, caption?: string | null, images?: Array<string | null> | null, publicId?: Array<string | null> | null, userId: string, user: { __typename?: 'User', id: string, name?: string | null, username?: string | null, image?: string | null }, likes: Array<{ __typename?: 'Like', id: string, userId: string, postId: string, post: { __typename?: 'Post', caption?: string | null, images?: Array<string | null> | null, userId: string }, user: { __typename?: 'User', id: string, name?: string | null, image?: string | null } } | null>, comments: Array<{ __typename?: 'Comment', id: string, content: string, user: { __typename?: 'User', username?: string | null, id: string, image?: string | null } } | null> } | null };

export type UpdatePostMutationVariables = Exact<{
  input: UpdatePostInput;
}>;


export type UpdatePostMutation = { __typename?: 'Mutation', updatePost?: { __typename?: 'Post', id: string, caption?: string | null, images?: Array<string | null> | null, userId: string, user: { __typename?: 'User', id: string, username?: string | null, image?: string | null, name?: string | null } } | null };

export type FollowMutationVariables = Exact<{
  followId: Scalars['String'];
}>;


export type FollowMutation = { __typename?: 'Mutation', follow?: { __typename?: 'User', id: string, name?: string | null, username?: string | null, email: string, phone?: string | null, following?: Array<{ __typename?: 'User', following?: Array<{ __typename?: 'User', name?: string | null, username?: string | null, image?: string | null } | null> | null } | null> | null } | null };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: string, name?: string | null, email: string, username?: string | null, phone?: string | null, image?: string | null, address?: string | null, website?: string | null, bio?: string | null, isAdmin: boolean, following?: Array<{ __typename?: 'User', id: string, name?: string | null, email: string, username?: string | null, phone?: string | null, image?: string | null } | null> | null, followers?: Array<{ __typename?: 'User', id: string, name?: string | null, email: string, username?: string | null, phone?: string | null, image?: string | null, address?: string | null } | null> | null } | null };

export type DeletePostMutationVariables = Exact<{
  postId: Scalars['String'];
}>;


export type DeletePostMutation = { __typename?: 'Mutation', deletePost?: { __typename?: 'Post', id: string, caption?: string | null, images?: Array<string | null> | null, userId: string } | null };

export type ExplorePostsQueryVariables = Exact<{ [key: string]: never; }>;


export type ExplorePostsQuery = { __typename?: 'Query', explorePosts?: Array<{ __typename?: 'Post', id: string, caption?: string | null, images?: Array<string | null> | null, publicId?: Array<string | null> | null, createdAt: any, userId: string, likes: Array<{ __typename?: 'Like', id: string, userId: string, postId: string } | null>, user: { __typename?: 'User', id: string, name?: string | null, email: string, username?: string | null, image?: string | null }, comments: Array<{ __typename?: 'Comment', id: string, content: string, postId: string, userId: string } | null> } | null> | null };

export type PostsQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['String']>;
}>;


export type PostsQuery = { __typename?: 'Query', posts?: { __typename?: 'PostConnection', edges?: Array<{ __typename?: 'PostEdge', cursor: string, node?: { __typename?: 'Post', id: string, caption?: string | null, images?: Array<string | null> | null, publicId?: Array<string | null> | null, createdAt: any, userId: string, likes: Array<{ __typename?: 'Like', id: string, userId: string, postId: string } | null>, user: { __typename?: 'User', id: string, name?: string | null, email: string, username?: string | null, image?: string | null }, comments: Array<{ __typename?: 'Comment', id: string, content: string, postId: string, userId: string } | null> } | null } | null> | null, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor?: string | null } } | null };

export type SearchUserQueryVariables = Exact<{
  input?: InputMaybe<Scalars['String']>;
}>;


export type SearchUserQuery = { __typename?: 'Query', searchUser: Array<{ __typename?: 'User', name?: string | null, image?: string | null, username?: string | null, id: string } | null> };

export type ToggleLikeMutationVariables = Exact<{
  postId: Scalars['String'];
}>;


export type ToggleLikeMutation = { __typename?: 'Mutation', toggleLike?: { __typename?: 'Like', id: string, userId: string, postId: string, user: { __typename?: 'User', name?: string | null, username?: string | null, image?: string | null }, post: { __typename?: 'Post', caption?: string | null, userId: string, likes: Array<{ __typename?: 'Like', id: string, userId: string } | null> } } | null };

export type UnfollowMutationVariables = Exact<{
  unfollowId: Scalars['String'];
}>;


export type UnfollowMutation = { __typename?: 'Mutation', unfollow?: { __typename?: 'User', id: string, name?: string | null, username?: string | null, email: string, phone?: string | null, following?: Array<{ __typename?: 'User', name?: string | null, email: string, image?: string | null, username?: string | null } | null> | null } | null };

export type UpdateProfileMutationVariables = Exact<{
  input?: InputMaybe<UpdateProfileInput>;
}>;


export type UpdateProfileMutation = { __typename?: 'Mutation', updateProfile?: { __typename?: 'User', id: string, name?: string | null, email: string, username?: string | null, phone?: string | null, image?: string | null, address?: string | null, bio?: string | null, website?: string | null } | null };

export type SignupMutationVariables = Exact<{
  input: CreateUserInput;
}>;


export type SignupMutation = { __typename?: 'Mutation', signup?: { __typename?: 'User', id: string, name?: string | null, email: string, username?: string | null, phone?: string | null, image?: string | null, address?: string | null, website?: string | null, bio?: string | null, isAdmin: boolean, following?: Array<{ __typename?: 'User', id: string, name?: string | null, email: string, username?: string | null, phone?: string | null, image?: string | null } | null> | null, followers?: Array<{ __typename?: 'User', id: string, name?: string | null, email: string, username?: string | null, phone?: string | null, image?: string | null, address?: string | null } | null> | null } | null };

export type LoginMutationVariables = Exact<{
  input: LoginUserInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login?: { __typename?: 'User', id: string, name?: string | null, email: string, username?: string | null, phone?: string | null, image?: string | null, address?: string | null, website?: string | null, bio?: string | null, isAdmin: boolean, following?: Array<{ __typename?: 'User', id: string, name?: string | null, email: string, username?: string | null, phone?: string | null, image?: string | null } | null> | null, followers?: Array<{ __typename?: 'User', id: string, name?: string | null, email: string, username?: string | null, phone?: string | null, image?: string | null, address?: string | null } | null> | null } | null };

export type LogoutMutationMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutationMutation = { __typename?: 'Mutation', logout?: boolean | null };

export type GetFollowSuggestionsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetFollowSuggestionsQuery = { __typename?: 'Query', getFollowSuggestions?: Array<{ __typename?: 'User', id: string, name?: string | null, username?: string | null, image?: string | null } | null> | null };


export const CreateCommentDocument = gql`
    mutation CreateComment($postId: String!, $content: String!) {
  createComment(postId: $postId, content: $content) {
    id
    content
    postId
    userId
    post {
      caption
      images
      userId
    }
    user {
      name
      id
      username
      image
    }
  }
}
    `;
export type CreateCommentMutationFn = Apollo.MutationFunction<CreateCommentMutation, CreateCommentMutationVariables>;

/**
 * __useCreateCommentMutation__
 *
 * To run a mutation, you first call `useCreateCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCommentMutation, { data, loading, error }] = useCreateCommentMutation({
 *   variables: {
 *      postId: // value for 'postId'
 *      content: // value for 'content'
 *   },
 * });
 */
export function useCreateCommentMutation(baseOptions?: Apollo.MutationHookOptions<CreateCommentMutation, CreateCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCommentMutation, CreateCommentMutationVariables>(CreateCommentDocument, options);
      }
export type CreateCommentMutationHookResult = ReturnType<typeof useCreateCommentMutation>;
export type CreateCommentMutationResult = Apollo.MutationResult<CreateCommentMutation>;
export type CreateCommentMutationOptions = Apollo.BaseMutationOptions<CreateCommentMutation, CreateCommentMutationVariables>;
export const CreatePostDocument = gql`
    mutation CreatePost($input: CreatePostInput!) {
  createPost(input: $input) {
    id
    caption
    images
    publicId
    userId
    user {
      id
      name
      username
      image
    }
    likes {
      id
      userId
      postId
      post {
        caption
        images
        userId
      }
      user {
        id
        name
        image
      }
    }
    comments {
      id
      content
      user {
        username
        id
        image
      }
    }
  }
}
    `;
export type CreatePostMutationFn = Apollo.MutationFunction<CreatePostMutation, CreatePostMutationVariables>;

/**
 * __useCreatePostMutation__
 *
 * To run a mutation, you first call `useCreatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPostMutation, { data, loading, error }] = useCreatePostMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreatePostMutation(baseOptions?: Apollo.MutationHookOptions<CreatePostMutation, CreatePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument, options);
      }
export type CreatePostMutationHookResult = ReturnType<typeof useCreatePostMutation>;
export type CreatePostMutationResult = Apollo.MutationResult<CreatePostMutation>;
export type CreatePostMutationOptions = Apollo.BaseMutationOptions<CreatePostMutation, CreatePostMutationVariables>;
export const UpdatePostDocument = gql`
    mutation UpdatePost($input: UpdatePostInput!) {
  updatePost(input: $input) {
    id
    caption
    images
    userId
    user {
      id
      username
      image
      name
    }
  }
}
    `;
export type UpdatePostMutationFn = Apollo.MutationFunction<UpdatePostMutation, UpdatePostMutationVariables>;

/**
 * __useUpdatePostMutation__
 *
 * To run a mutation, you first call `useUpdatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePostMutation, { data, loading, error }] = useUpdatePostMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdatePostMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePostMutation, UpdatePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePostMutation, UpdatePostMutationVariables>(UpdatePostDocument, options);
      }
export type UpdatePostMutationHookResult = ReturnType<typeof useUpdatePostMutation>;
export type UpdatePostMutationResult = Apollo.MutationResult<UpdatePostMutation>;
export type UpdatePostMutationOptions = Apollo.BaseMutationOptions<UpdatePostMutation, UpdatePostMutationVariables>;
export const FollowDocument = gql`
    mutation Follow($followId: String!) {
  follow(id: $followId) {
    id
    name
    username
    email
    phone
    following {
      following {
        name
        username
        image
      }
    }
  }
}
    `;
export type FollowMutationFn = Apollo.MutationFunction<FollowMutation, FollowMutationVariables>;

/**
 * __useFollowMutation__
 *
 * To run a mutation, you first call `useFollowMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useFollowMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [followMutation, { data, loading, error }] = useFollowMutation({
 *   variables: {
 *      followId: // value for 'followId'
 *   },
 * });
 */
export function useFollowMutation(baseOptions?: Apollo.MutationHookOptions<FollowMutation, FollowMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<FollowMutation, FollowMutationVariables>(FollowDocument, options);
      }
export type FollowMutationHookResult = ReturnType<typeof useFollowMutation>;
export type FollowMutationResult = Apollo.MutationResult<FollowMutation>;
export type FollowMutationOptions = Apollo.BaseMutationOptions<FollowMutation, FollowMutationVariables>;
export const MeDocument = gql`
    query Me {
  me {
    id
    name
    email
    username
    phone
    image
    address
    website
    bio
    isAdmin
    following {
      id
      name
      email
      username
      phone
      image
    }
    followers {
      id
      name
      email
      username
      phone
      image
      address
    }
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const DeletePostDocument = gql`
    mutation DeletePost($postId: String!) {
  deletePost(postId: $postId) {
    id
    caption
    images
    userId
  }
}
    `;
export type DeletePostMutationFn = Apollo.MutationFunction<DeletePostMutation, DeletePostMutationVariables>;

/**
 * __useDeletePostMutation__
 *
 * To run a mutation, you first call `useDeletePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePostMutation, { data, loading, error }] = useDeletePostMutation({
 *   variables: {
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useDeletePostMutation(baseOptions?: Apollo.MutationHookOptions<DeletePostMutation, DeletePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeletePostMutation, DeletePostMutationVariables>(DeletePostDocument, options);
      }
export type DeletePostMutationHookResult = ReturnType<typeof useDeletePostMutation>;
export type DeletePostMutationResult = Apollo.MutationResult<DeletePostMutation>;
export type DeletePostMutationOptions = Apollo.BaseMutationOptions<DeletePostMutation, DeletePostMutationVariables>;
export const ExplorePostsDocument = gql`
    query ExplorePosts {
  explorePosts {
    id
    caption
    images
    publicId
    createdAt
    userId
    likes {
      id
      userId
      postId
    }
    user {
      id
      name
      email
      username
      image
    }
    comments {
      id
      content
      postId
      userId
    }
  }
}
    `;

/**
 * __useExplorePostsQuery__
 *
 * To run a query within a React component, call `useExplorePostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useExplorePostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useExplorePostsQuery({
 *   variables: {
 *   },
 * });
 */
export function useExplorePostsQuery(baseOptions?: Apollo.QueryHookOptions<ExplorePostsQuery, ExplorePostsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ExplorePostsQuery, ExplorePostsQueryVariables>(ExplorePostsDocument, options);
      }
export function useExplorePostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ExplorePostsQuery, ExplorePostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ExplorePostsQuery, ExplorePostsQueryVariables>(ExplorePostsDocument, options);
        }
export type ExplorePostsQueryHookResult = ReturnType<typeof useExplorePostsQuery>;
export type ExplorePostsLazyQueryHookResult = ReturnType<typeof useExplorePostsLazyQuery>;
export type ExplorePostsQueryResult = Apollo.QueryResult<ExplorePostsQuery, ExplorePostsQueryVariables>;
export const PostsDocument = gql`
    query Posts($first: Int, $after: String) {
  posts(first: $first, after: $after) {
    edges {
      cursor
      node {
        id
        caption
        images
        publicId
        createdAt
        userId
        likes {
          id
          userId
          postId
        }
        user {
          id
          name
          email
          username
          image
        }
        comments {
          id
          content
          postId
          userId
        }
      }
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}
    `;

/**
 * __usePostsQuery__
 *
 * To run a query within a React component, call `usePostsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostsQuery({
 *   variables: {
 *      first: // value for 'first'
 *      after: // value for 'after'
 *   },
 * });
 */
export function usePostsQuery(baseOptions?: Apollo.QueryHookOptions<PostsQuery, PostsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PostsQuery, PostsQueryVariables>(PostsDocument, options);
      }
export function usePostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PostsQuery, PostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PostsQuery, PostsQueryVariables>(PostsDocument, options);
        }
export type PostsQueryHookResult = ReturnType<typeof usePostsQuery>;
export type PostsLazyQueryHookResult = ReturnType<typeof usePostsLazyQuery>;
export type PostsQueryResult = Apollo.QueryResult<PostsQuery, PostsQueryVariables>;
export const SearchUserDocument = gql`
    query SearchUser($input: String) {
  searchUser(input: $input) {
    name
    image
    username
    id
  }
}
    `;

/**
 * __useSearchUserQuery__
 *
 * To run a query within a React component, call `useSearchUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchUserQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSearchUserQuery(baseOptions?: Apollo.QueryHookOptions<SearchUserQuery, SearchUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchUserQuery, SearchUserQueryVariables>(SearchUserDocument, options);
      }
export function useSearchUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchUserQuery, SearchUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchUserQuery, SearchUserQueryVariables>(SearchUserDocument, options);
        }
export type SearchUserQueryHookResult = ReturnType<typeof useSearchUserQuery>;
export type SearchUserLazyQueryHookResult = ReturnType<typeof useSearchUserLazyQuery>;
export type SearchUserQueryResult = Apollo.QueryResult<SearchUserQuery, SearchUserQueryVariables>;
export const ToggleLikeDocument = gql`
    mutation ToggleLike($postId: String!) {
  toggleLike(postId: $postId) {
    id
    user {
      name
      username
      image
    }
    userId
    postId
    post {
      caption
      userId
      likes {
        id
        userId
      }
    }
  }
}
    `;
export type ToggleLikeMutationFn = Apollo.MutationFunction<ToggleLikeMutation, ToggleLikeMutationVariables>;

/**
 * __useToggleLikeMutation__
 *
 * To run a mutation, you first call `useToggleLikeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useToggleLikeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [toggleLikeMutation, { data, loading, error }] = useToggleLikeMutation({
 *   variables: {
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useToggleLikeMutation(baseOptions?: Apollo.MutationHookOptions<ToggleLikeMutation, ToggleLikeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ToggleLikeMutation, ToggleLikeMutationVariables>(ToggleLikeDocument, options);
      }
export type ToggleLikeMutationHookResult = ReturnType<typeof useToggleLikeMutation>;
export type ToggleLikeMutationResult = Apollo.MutationResult<ToggleLikeMutation>;
export type ToggleLikeMutationOptions = Apollo.BaseMutationOptions<ToggleLikeMutation, ToggleLikeMutationVariables>;
export const UnfollowDocument = gql`
    mutation Unfollow($unfollowId: String!) {
  unfollow(id: $unfollowId) {
    id
    name
    username
    email
    phone
    following {
      name
      email
      image
      username
    }
  }
}
    `;
export type UnfollowMutationFn = Apollo.MutationFunction<UnfollowMutation, UnfollowMutationVariables>;

/**
 * __useUnfollowMutation__
 *
 * To run a mutation, you first call `useUnfollowMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnfollowMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unfollowMutation, { data, loading, error }] = useUnfollowMutation({
 *   variables: {
 *      unfollowId: // value for 'unfollowId'
 *   },
 * });
 */
export function useUnfollowMutation(baseOptions?: Apollo.MutationHookOptions<UnfollowMutation, UnfollowMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UnfollowMutation, UnfollowMutationVariables>(UnfollowDocument, options);
      }
export type UnfollowMutationHookResult = ReturnType<typeof useUnfollowMutation>;
export type UnfollowMutationResult = Apollo.MutationResult<UnfollowMutation>;
export type UnfollowMutationOptions = Apollo.BaseMutationOptions<UnfollowMutation, UnfollowMutationVariables>;
export const UpdateProfileDocument = gql`
    mutation UpdateProfile($input: UpdateProfileInput) {
  updateProfile(input: $input) {
    id
    name
    email
    username
    phone
    image
    address
    bio
    website
  }
}
    `;
export type UpdateProfileMutationFn = Apollo.MutationFunction<UpdateProfileMutation, UpdateProfileMutationVariables>;

/**
 * __useUpdateProfileMutation__
 *
 * To run a mutation, you first call `useUpdateProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProfileMutation, { data, loading, error }] = useUpdateProfileMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateProfileMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProfileMutation, UpdateProfileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateProfileMutation, UpdateProfileMutationVariables>(UpdateProfileDocument, options);
      }
export type UpdateProfileMutationHookResult = ReturnType<typeof useUpdateProfileMutation>;
export type UpdateProfileMutationResult = Apollo.MutationResult<UpdateProfileMutation>;
export type UpdateProfileMutationOptions = Apollo.BaseMutationOptions<UpdateProfileMutation, UpdateProfileMutationVariables>;
export const SignupDocument = gql`
    mutation Signup($input: CreateUserInput!) {
  signup(input: $input) {
    id
    name
    email
    username
    phone
    image
    address
    website
    bio
    isAdmin
    following {
      id
      name
      email
      username
      phone
      image
    }
    followers {
      id
      name
      email
      username
      phone
      image
      address
    }
  }
}
    `;
export type SignupMutationFn = Apollo.MutationFunction<SignupMutation, SignupMutationVariables>;

/**
 * __useSignupMutation__
 *
 * To run a mutation, you first call `useSignupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signupMutation, { data, loading, error }] = useSignupMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSignupMutation(baseOptions?: Apollo.MutationHookOptions<SignupMutation, SignupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignupMutation, SignupMutationVariables>(SignupDocument, options);
      }
export type SignupMutationHookResult = ReturnType<typeof useSignupMutation>;
export type SignupMutationResult = Apollo.MutationResult<SignupMutation>;
export type SignupMutationOptions = Apollo.BaseMutationOptions<SignupMutation, SignupMutationVariables>;
export const LoginDocument = gql`
    mutation Login($input: LoginUserInput!) {
  login(input: $input) {
    id
    name
    email
    username
    phone
    image
    address
    website
    bio
    isAdmin
    following {
      id
      name
      email
      username
      phone
      image
    }
    followers {
      id
      name
      email
      username
      phone
      image
      address
    }
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutMutationDocument = gql`
    mutation LogoutMutation {
  logout
}
    `;
export type LogoutMutationMutationFn = Apollo.MutationFunction<LogoutMutationMutation, LogoutMutationMutationVariables>;

/**
 * __useLogoutMutationMutation__
 *
 * To run a mutation, you first call `useLogoutMutationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutationMutation, { data, loading, error }] = useLogoutMutationMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutationMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutationMutation, LogoutMutationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutationMutation, LogoutMutationMutationVariables>(LogoutMutationDocument, options);
      }
export type LogoutMutationMutationHookResult = ReturnType<typeof useLogoutMutationMutation>;
export type LogoutMutationMutationResult = Apollo.MutationResult<LogoutMutationMutation>;
export type LogoutMutationMutationOptions = Apollo.BaseMutationOptions<LogoutMutationMutation, LogoutMutationMutationVariables>;
export const GetFollowSuggestionsDocument = gql`
    query GetFollowSuggestions {
  getFollowSuggestions {
    id
    name
    username
    image
  }
}
    `;

/**
 * __useGetFollowSuggestionsQuery__
 *
 * To run a query within a React component, call `useGetFollowSuggestionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFollowSuggestionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFollowSuggestionsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetFollowSuggestionsQuery(baseOptions?: Apollo.QueryHookOptions<GetFollowSuggestionsQuery, GetFollowSuggestionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetFollowSuggestionsQuery, GetFollowSuggestionsQueryVariables>(GetFollowSuggestionsDocument, options);
      }
export function useGetFollowSuggestionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetFollowSuggestionsQuery, GetFollowSuggestionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetFollowSuggestionsQuery, GetFollowSuggestionsQueryVariables>(GetFollowSuggestionsDocument, options);
        }
export type GetFollowSuggestionsQueryHookResult = ReturnType<typeof useGetFollowSuggestionsQuery>;
export type GetFollowSuggestionsLazyQueryHookResult = ReturnType<typeof useGetFollowSuggestionsLazyQuery>;
export type GetFollowSuggestionsQueryResult = Apollo.QueryResult<GetFollowSuggestionsQuery, GetFollowSuggestionsQueryVariables>;