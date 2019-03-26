import { gql } from 'apollo-server-express'

export default gql`
  type Message {
    id: ID
    createdAt: Date
    message: String
    sender: User
    channel: Channel
  }

  extend type Query {
    getMessages(channelId: ID!, cursor: String): [Message]
    getUserMessages(userId: ID!): [Message]
  }

  extend type Mutation {
    postMessage(channelId: ID!, message: String!): Message
    editMessage(messageId: ID!): Message
    deleteMessage(messageId: ID!): Message
  }

  extend type Subscription {
    postedMessage: Message,
    deletedMessage: Message,
    changedMessage: Message
  }
`