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

export type Query = {
  __typename?: 'Query';
  searchUser?: Maybe<Array<Maybe<User>>>;
};


export type QuerySearchUserArgs = {
  input?: InputMaybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  address?: Maybe<Scalars['String']>;
  bio?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  id: Scalars['String'];
  image?: Maybe<Scalars['String']>;
  isAdmin: Scalars['Boolean'];
  name: Scalars['String'];
  phone?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
  website?: Maybe<Scalars['String']>;
};

export type SearchUserQueryVariables = Exact<{
  input?: InputMaybe<Scalars['String']>;
}>;


export type SearchUserQuery = { __typename?: 'Query', searchUser?: Array<{ __typename?: 'User', address?: string | null, bio?: string | null, email: string, id: string, image?: string | null, isAdmin: boolean, name: string, phone?: string | null, username?: string | null, website?: string | null } | null> | null };


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