"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
exports.default = apollo_server_express_1.gql `
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
`;
