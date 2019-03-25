import { gql } from 'apollo-server-express'

export default gql`
  type Server {
    id: ID
    name: String
    host: User
    users: [User]
    channels: [Channel]
  }

  extend type Query {
    server(serverId: ID!): Server
    servers: [Server]
    userServers(userId: ID!): [Server]
  }

  extend type Mutation {
    createServer(name: String!, userId: ID!): Server
    deleteServer(serverId: ID!): Server
    editServer: Server
    joinServer(serverId: ID!, userId: ID!): Server 
    removeUserFromServer(serverId: ID!, userId: ID!): User
    acceptServerInvitation(invitationId: ID!): Server
  }

  extend type Subscription {
    deletedServer: Server
    removedUser: User
    userJoinedServer: Server
  }
`