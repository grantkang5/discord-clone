import { gql } from 'apollo-server-express'

export default gql`
  enum ChannelType {
    TEXT
    VOICE
  }

  type Channel {
    id: ID
    name: String
    type: ChannelType
    server: [Server]
  }

  extend type Query {
    getServerChannels(serverId: ID!): [Channel]
  }

  extend type Mutation {
    createChannel(type: ChannelType!, name: String!, serverId: ID!): Channel
    deleteChannel(channelId: ID!): Channel
  }
`