const { gql } = require("apollo-server-express");
exports.typeDefs = `
  type User {
    ID: ID!
    name: String!
    email: String!
    password: String!
    username: String
    phone: String
    address: String
    role: String
    post: [Post]
    createdAt: String!
    updatedAt: String!
  }

  type Post {
    ID: ID!
    username: String
    title: String!
    content: String!
    createdAt: String!
    updatedAt: String!
    user: User
  }

  type Query {
    allUsers: [User!]!
    findUser(input: findUser): User
    allPosts: [Post!]!
    findPost(input: findPost): [Post!]!
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
    createUser(input: createUser): User
    createPost(input: createPost): Post
    deleteUser(input: deleteUser): Boolean
    deletePost(input: deletePost): Boolean
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
    username: String!
  }

  input deleteUser {
    username: String
  }

  input deletePost {
    ID: ID
    username: String
  }
`;
