const { gql } = require("apollo-server");

const typeDef = gql`
  type Post {
    id: ID!
    body: String!
    createdAt: String!
    username: String!
  }

  type User {
    id: ID!
    email: String!
    token: String!
    username: String!
    createdAt: String!
  }

  input SignupInput {
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
  }

  type Query {
    getPosts: [Post]
    getPost(postId: ID!): Post
  }

  type Mutation {
    signup(signupInput: SignupInput): User!
    signin(username: String!, password: String!): User!
    createPost(body: String!): Post!
    deletePost(postId: ID!): String!
  }
`;

module.exports = typeDef;
