import { gql } from 'apollo-server-express';

export default gql`
  type User {
    id: ID
    email: String
    password: String
    hostedServers: [Server]
    joinedServers: [Server]
  }

  type Query {
    users: [User!]
    user(id: ID!): User
    me: User
  }

  type Mutation {
    signUp(email: String!, password: String!): User!
    logIn(email: String!, password: String!): User!
    logOut: User
    deleteUser(id: ID!): User
  }

  type Subscription {
    userCreated: User
  }
`