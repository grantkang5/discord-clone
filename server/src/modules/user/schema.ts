import { gql } from 'apollo-server-express'

export default gql`
  scalar Upload

  type File {
    filename: String
    mimetype: String
    encoding: String
  }

  type User {
    id: ID
    email: String
    password: String
    name: String
    avatar: String
    hostedServers: [Server]
    joinedServers: [Server]
  }

  type Query {
    users: [User!]
    onlineUsers(serverId: ID!): [User]
    user(id: ID!): User
    me: User
    usersByName(name: String!): [User]
  }

  type Mutation {
    editName(userId: ID!, name: String!): User!
    editUser(
      userId: ID!
      name: String
      email: String
      currentPassword: String
      newPassword: String
      avatar: Upload
    ): User
    logOut: User
    deleteUser(id: ID!): User
  }

  type Subscription {
    userLoggedIn: User
    userLoggedOut: User
  }
`
