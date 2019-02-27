import { gql } from 'apollo-server-express'

export default gql`
  type Server {
    id: ID
    name: String
    host: User
    users: [User]
  }

  extend type Query {
    servers: [Server]
    userServers(userId: ID!): [Server]
  }

  extend type Mutation {
    createServer(name: String!, userId: ID!): Server
    deleteServer(serverId: ID!): Server
    editServer: Server
    addUserToServer(serverId: ID!, userId: ID!): Server 
    # removeUserFromServer: User
  }
`