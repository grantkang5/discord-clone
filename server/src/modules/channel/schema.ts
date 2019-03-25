import { gql } from 'apollo-server-express'

export default gql`
  enum ChannelType {
    TEXT
    VOICE
  }

  type Channel {
    id: ID
    name: String
    type(channelType: ChannelType): String
    server: Server
  }

  extend type Query {
    channel(channelId: ID!): Channel
    getServerChannels(serverId: ID!): [Channel]
  }

  extend type Mutation {
    createChannel(type: String!, name: String!, serverId: ID!): Channel
    changeChannel(channelId: ID!, name: String!): Channel
    deleteChannel(channelId: ID!): Channel
  }

  extend type Subscription {
    deletedChannel: Channel
    createdChannel: Channel
    changedChannel: Channel
  }
`