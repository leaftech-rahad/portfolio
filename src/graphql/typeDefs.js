import { gql } from "apollo-server-express";

export const typeDefs = gql`
  directive @auth on FIELD_DEFINITION
  directive @guest on FIELD_DEFINITION

  scalar DateTime

  type User {
    ID: ID!
    name: String!
    email: String!
    username: String
    phone: String
    address: String
    role: String
    post: [Post]
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Post {
    ID: ID!
    authorId: ID!
    username: String
    title: String!
    content: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    user: User
  }

  type Query {
    allUsers: [User!]! @auth
    findUser(input: findUser): User @auth
    allPosts: [Post!]! @auth
    findPost(input: findPost): [Post!]! @auth
  }

  input findPost {
    title: String
    username: String
  }

  input findUser {
    username: String
    email: String
  }

  type Mutation {
    createUser(input: createUser): User @guest
    createPost(input: createPost): Post @auth
    deleteUser: Boolean @auth
    deletePost(input: deletePost): Boolean @auth
    me: User @auth
    signIn(input: signIn): User @guest
    signOut: Boolean @auth
  }
  input signIn {
    email: String!
    password: String!
  }

  input createUser {
    name: String!
    email: String!
    username: String!
    phone: String
    address: String
    role: String
    password: String!
  }

  input createPost {
    title: String!
    content: String!
  }

  input deletePost {
    ID: ID
    username: String
  }
`;
