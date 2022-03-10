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
};

export type Mutation = {
  __typename?: 'Mutation';
  follow?: Maybe<User>;
  unfollow?: Maybe<User>;
  updateProfile?: Maybe<User>;
};


export type MutationFollowArgs = {
  id: Scalars['String'];
};


export type MutationUnfollowArgs = {
  id: Scalars['String'];
};


export type MutationUpdateProfileArgs = {
  input?: InputMaybe<UpdateProfileInput>;
};

export type Post = {
  __typename?: 'Post';
  caption?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  images?: Maybe<Array<Maybe<Scalars['String']>>>;
  user: Post;
  userId: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  Me?: Maybe<User>;
  getUser: User;
  searchUser: Array<Maybe<User>>;
};


export type QueryGetUserArgs = {
  id: Scalars['String'];
};


export type QuerySearchUserArgs = {
  input?: InputMaybe<Scalars['String']>;
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
  email: Scalars['String'];
  followers?: Maybe<Array<Maybe<User>>>;
  following?: Maybe<Array<Maybe<User>>>;
  id: Scalars['String'];
  image?: Maybe<Scalars['String']>;
  isAdmin: Scalars['Boolean'];
  name: Scalars['String'];
  phone?: Maybe<Scalars['String']>;
  posts: Array<Maybe<Post>>;
  username?: Maybe<Scalars['String']>;
  website?: Maybe<Scalars['String']>;
};

export type FollowMutationVariables = Exact<{
  followId: Scalars['String'];
}>;


export type FollowMutation = { __typename?: 'Mutation', follow?: { __typename?: 'User', id: string, name: string, username?: string | null, email: string, phone?: string | null, following?: Array<{ __typename?: 'User', following?: Array<{ __typename?: 'User', name: string, username?: string | null, image?: string | null } | null> | null } | null> | null } | null };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', Me?: { __typename?: 'User', id: string, name: string, email: string, username?: string | null, phone?: string | null, image?: string | null, address?: string | null, website?: string | null, bio?: string | null, isAdmin: boolean, following?: Array<{ __typename?: 'User', id: string, name: string, email: string, username?: string | null, phone?: string | null, image?: string | null } | null> | null, followers?: Array<{ __typename?: 'User', id: string, name: string, email: string, username?: string | null, phone?: string | null, image?: string | null, address?: string | null } | null> | null } | null };

export type SearchUserQueryVariables = Exact<{
  input?: InputMaybe<Scalars['String']>;
}>;


export type SearchUserQuery = { __typename?: 'Query', searchUser: Array<{ __typename?: 'User', address?: string | null, bio?: string | null, email: string, id: string, image?: string | null, isAdmin: boolean, name: string, phone?: string | null, username?: string | null, website?: string | null } | null> };

export type UnfollowMutationVariables = Exact<{
  unfollowId: Scalars['String'];
}>;


export type UnfollowMutation = { __typename?: 'Mutation', unfollow?: { __typename?: 'User', id: string, name: string, username?: string | null, email: string, phone?: string | null, following?: Array<{ __typename?: 'User', name: string, email: string, image?: string | null, username?: string | null } | null> | null } | null };

export type UpdateProfileMutationVariables = Exact<{
  input?: InputMaybe<UpdateProfileInput>;
}>;


export type UpdateProfileMutation = { __typename?: 'Mutation', updateProfile?: { __typename?: 'User', id: string, name: string, email: string, username?: string | null, phone?: string | null, image?: string | null, address?: string | null, bio?: string | null, website?: string | null } | null };


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
  Me {
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
export const SearchUserDocument = gql`
    query SearchUser($input: String) {
  searchUser(input: $input) {
    address
    bio
    email
    id
    image
    isAdmin
    name
    phone
    username
    website
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