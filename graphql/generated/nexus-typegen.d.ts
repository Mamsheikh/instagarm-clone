/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */


import type { Context } from "./../../types/Context"
import type { core, connectionPluginCore } from "nexus"
declare global {
  interface NexusGenCustomInputMethods<TypeName extends string> {
    /**
     * A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.
     */
    dateTime<FieldName extends string>(fieldName: FieldName, opts?: core.CommonInputFieldConfig<TypeName, FieldName>): void // "DateTime";
  }
}
declare global {
  interface NexusGenCustomOutputMethods<TypeName extends string> {
    /**
     * A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.
     */
    dateTime<FieldName extends string>(fieldName: FieldName, ...opts: core.ScalarOutSpread<TypeName, FieldName>): void // "DateTime";
    /**
     * Adds a Relay-style connection to the type, with numerous options for configuration
     *
     * @see https://nexusjs.org/docs/plugins/connection
     */
    connectionField<FieldName extends string>(
      fieldName: FieldName,
      config: connectionPluginCore.ConnectionFieldConfig<TypeName, FieldName>
    ): void
  }
}


declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
  CreatePostInput: { // input type
    caption?: string | null; // String
    images?: Array<string | null> | null; // [String]
  }
  CreateUserInput: { // input type
    email: string; // String!
    password: string; // String!
    username: string; // String!
  }
  LoginUserInput: { // input type
    email_or_username: string; // String!
    password: string; // String!
  }
  UpdatePostInput: { // input type
    caption?: string | null; // String
    id: string; // String!
    images?: Array<string | null> | null; // [String]
  }
  UpdateProfileInput: { // input type
    address?: string | null; // String
    bio?: string | null; // String
    image?: string | null; // String
    name?: string | null; // String
    phone?: string | null; // String
    username?: string | null; // String
    website?: string | null; // String
  }
}

export interface NexusGenEnums {
}

export interface NexusGenScalars {
  String: string
  Int: number
  Float: number
  Boolean: boolean
  ID: string
  DateTime: any
}

export interface NexusGenObjects {
  Comment: { // root type
    content: string; // String!
    id: string; // String!
    postId: string; // String!
    userId: string; // String!
  }
  Like: { // root type
    id: string; // String!
    postId: string; // String!
    userId: string; // String!
  }
  Mutation: {};
  PageInfo: { // root type
    endCursor?: string | null; // String
    hasNextPage: boolean; // Boolean!
    hasPreviousPage: boolean; // Boolean!
    startCursor?: string | null; // String
  }
  Post: { // root type
    caption?: string | null; // String
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: string; // String!
    images?: Array<string | null> | null; // [String]
    userId: string; // String!
  }
  PostConnection: { // root type
    edges?: Array<NexusGenRootTypes['PostEdge'] | null> | null; // [PostEdge]
    pageInfo: NexusGenRootTypes['PageInfo']; // PageInfo!
  }
  PostEdge: { // root type
    cursor: string; // String!
    node?: NexusGenRootTypes['Post'] | null; // Post
  }
  Query: {};
  User: { // root type
    address?: string | null; // String
    bio?: string | null; // String
    email: string; // String!
    id: string; // String!
    image?: string | null; // String
    isAdmin: boolean; // Boolean!
    name?: string | null; // String
    phone?: string | null; // String
    username?: string | null; // String
    website?: string | null; // String
  }
}

export interface NexusGenInterfaces {
}

export interface NexusGenUnions {
}

export type NexusGenRootTypes = NexusGenObjects

export type NexusGenAllTypes = NexusGenRootTypes & NexusGenScalars

export interface NexusGenFieldTypes {
  Comment: { // field return type
    content: string; // String!
    id: string; // String!
    post: NexusGenRootTypes['Post']; // Post!
    postId: string; // String!
    user: NexusGenRootTypes['User']; // User!
    userId: string; // String!
  }
  Like: { // field return type
    id: string; // String!
    post: NexusGenRootTypes['Post']; // Post!
    postId: string; // String!
    user: NexusGenRootTypes['User']; // User!
    userId: string; // String!
  }
  Mutation: { // field return type
    createComment: NexusGenRootTypes['Comment'] | null; // Comment
    createPost: NexusGenRootTypes['Post'] | null; // Post
    deleteComment: NexusGenRootTypes['Comment'] | null; // Comment
    deletePost: NexusGenRootTypes['Post'] | null; // Post
    follow: NexusGenRootTypes['User'] | null; // User
    login: NexusGenRootTypes['User'] | null; // User
    logout: boolean | null; // Boolean
    signup: NexusGenRootTypes['User'] | null; // User
    toggleLike: NexusGenRootTypes['Like'] | null; // Like
    unfollow: NexusGenRootTypes['User'] | null; // User
    updateComment: NexusGenRootTypes['Comment'] | null; // Comment
    updatePost: NexusGenRootTypes['Post'] | null; // Post
    updateProfile: NexusGenRootTypes['User'] | null; // User
  }
  PageInfo: { // field return type
    endCursor: string | null; // String
    hasNextPage: boolean; // Boolean!
    hasPreviousPage: boolean; // Boolean!
    startCursor: string | null; // String
  }
  Post: { // field return type
    caption: string | null; // String
    comments: Array<NexusGenRootTypes['Comment'] | null>; // [Comment]!
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: string; // String!
    images: Array<string | null> | null; // [String]
    likes: Array<NexusGenRootTypes['Like'] | null>; // [Like]!
    publicId: Array<string | null> | null; // [String]
    user: NexusGenRootTypes['User']; // User!
    userId: string; // String!
  }
  PostConnection: { // field return type
    edges: Array<NexusGenRootTypes['PostEdge'] | null> | null; // [PostEdge]
    pageInfo: NexusGenRootTypes['PageInfo']; // PageInfo!
  }
  PostEdge: { // field return type
    cursor: string; // String!
    node: NexusGenRootTypes['Post'] | null; // Post
  }
  Query: { // field return type
    explorePosts: Array<NexusGenRootTypes['Post'] | null> | null; // [Post]
    getFollowSuggestions: Array<NexusGenRootTypes['User'] | null> | null; // [User]
    getUser: NexusGenRootTypes['User']; // User!
    me: NexusGenRootTypes['User'] | null; // User
    posts: NexusGenRootTypes['PostConnection'] | null; // PostConnection
    searchUser: Array<NexusGenRootTypes['User'] | null>; // [User]!
  }
  User: { // field return type
    address: string | null; // String
    bio: string | null; // String
    comments: Array<NexusGenRootTypes['Comment'] | null>; // [Comment]!
    email: string; // String!
    followers: Array<NexusGenRootTypes['User'] | null> | null; // [User]
    following: Array<NexusGenRootTypes['User'] | null> | null; // [User]
    id: string; // String!
    image: string | null; // String
    isAdmin: boolean; // Boolean!
    likes: Array<NexusGenRootTypes['Like'] | null>; // [Like]!
    name: string | null; // String
    phone: string | null; // String
    posts: Array<NexusGenRootTypes['Post'] | null>; // [Post]!
    username: string | null; // String
    website: string | null; // String
  }
}

export interface NexusGenFieldTypeNames {
  Comment: { // field return type name
    content: 'String'
    id: 'String'
    post: 'Post'
    postId: 'String'
    user: 'User'
    userId: 'String'
  }
  Like: { // field return type name
    id: 'String'
    post: 'Post'
    postId: 'String'
    user: 'User'
    userId: 'String'
  }
  Mutation: { // field return type name
    createComment: 'Comment'
    createPost: 'Post'
    deleteComment: 'Comment'
    deletePost: 'Post'
    follow: 'User'
    login: 'User'
    logout: 'Boolean'
    signup: 'User'
    toggleLike: 'Like'
    unfollow: 'User'
    updateComment: 'Comment'
    updatePost: 'Post'
    updateProfile: 'User'
  }
  PageInfo: { // field return type name
    endCursor: 'String'
    hasNextPage: 'Boolean'
    hasPreviousPage: 'Boolean'
    startCursor: 'String'
  }
  Post: { // field return type name
    caption: 'String'
    comments: 'Comment'
    createdAt: 'DateTime'
    id: 'String'
    images: 'String'
    likes: 'Like'
    publicId: 'String'
    user: 'User'
    userId: 'String'
  }
  PostConnection: { // field return type name
    edges: 'PostEdge'
    pageInfo: 'PageInfo'
  }
  PostEdge: { // field return type name
    cursor: 'String'
    node: 'Post'
  }
  Query: { // field return type name
    explorePosts: 'Post'
    getFollowSuggestions: 'User'
    getUser: 'User'
    me: 'User'
    posts: 'PostConnection'
    searchUser: 'User'
  }
  User: { // field return type name
    address: 'String'
    bio: 'String'
    comments: 'Comment'
    email: 'String'
    followers: 'User'
    following: 'User'
    id: 'String'
    image: 'String'
    isAdmin: 'Boolean'
    likes: 'Like'
    name: 'String'
    phone: 'String'
    posts: 'Post'
    username: 'String'
    website: 'String'
  }
}

export interface NexusGenArgTypes {
  Mutation: {
    createComment: { // args
      content: string; // String!
      postId: string; // String!
    }
    createPost: { // args
      input: NexusGenInputs['CreatePostInput']; // CreatePostInput!
    }
    deleteComment: { // args
      commentId: string; // String!
    }
    deletePost: { // args
      postId: string; // String!
    }
    follow: { // args
      id: string; // String!
    }
    login: { // args
      input: NexusGenInputs['LoginUserInput']; // LoginUserInput!
    }
    signup: { // args
      input: NexusGenInputs['CreateUserInput']; // CreateUserInput!
    }
    toggleLike: { // args
      postId: string; // String!
    }
    unfollow: { // args
      id: string; // String!
    }
    updateComment: { // args
      caption: string; // String!
      commentId: string; // String!
    }
    updatePost: { // args
      input: NexusGenInputs['UpdatePostInput']; // UpdatePostInput!
    }
    updateProfile: { // args
      input?: NexusGenInputs['UpdateProfileInput'] | null; // UpdateProfileInput
    }
  }
  Query: {
    getUser: { // args
      id: string; // String!
    }
    posts: { // args
      after?: string | null; // String
      before?: string | null; // String
      first?: number | null; // Int
      last?: number | null; // Int
    }
    searchUser: { // args
      input?: string | null; // String
    }
  }
}

export interface NexusGenAbstractTypeMembers {
}

export interface NexusGenTypeInterfaces {
}

export type NexusGenObjectNames = keyof NexusGenObjects;

export type NexusGenInputNames = keyof NexusGenInputs;

export type NexusGenEnumNames = never;

export type NexusGenInterfaceNames = never;

export type NexusGenScalarNames = keyof NexusGenScalars;

export type NexusGenUnionNames = never;

export type NexusGenObjectsUsingAbstractStrategyIsTypeOf = never;

export type NexusGenAbstractsUsingStrategyResolveType = never;

export type NexusGenFeaturesConfig = {
  abstractTypeStrategies: {
    isTypeOf: false
    resolveType: true
    __typename: false
  }
}

export interface NexusGenTypes {
  context: Context;
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  inputTypeShapes: NexusGenInputs & NexusGenEnums & NexusGenScalars;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  fieldTypeNames: NexusGenFieldTypeNames;
  allTypes: NexusGenAllTypes;
  typeInterfaces: NexusGenTypeInterfaces;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes: NexusGenTypes['inputNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['scalarNames'];
  allOutputTypes: NexusGenTypes['objectNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['unionNames'] | NexusGenTypes['interfaceNames'] | NexusGenTypes['scalarNames'];
  allNamedTypes: NexusGenTypes['allInputTypes'] | NexusGenTypes['allOutputTypes']
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames'];
  abstractTypeMembers: NexusGenAbstractTypeMembers;
  objectsUsingAbstractStrategyIsTypeOf: NexusGenObjectsUsingAbstractStrategyIsTypeOf;
  abstractsUsingStrategyResolveType: NexusGenAbstractsUsingStrategyResolveType;
  features: NexusGenFeaturesConfig;
}


declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginInputTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginFieldConfig<TypeName extends string, FieldName extends string> {
    
  }
  interface NexusGenPluginInputFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginSchemaConfig {
  }
  interface NexusGenPluginArgConfig {
  }
}