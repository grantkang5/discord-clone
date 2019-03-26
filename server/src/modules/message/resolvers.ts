import { IResolvers } from "graphql-tools";
import { getCustomRepository } from 'typeorm'
import MessageRepository from './repository'
import { pubsub, MESSAGE_POSTED } from "../subscriptions";

const resolvers: IResolvers = {
  Query: {
    getMessages: async (_, { channelId, cursor }) => {
      return await getCustomRepository(MessageRepository).getMessages({ channelId, cursor })
    },
    // getUserMessages: async (_, { userId }) => {
    //   return await getCustomRepository(MessageRepository).getUserMessages({ userId })
    // }
  },

  Mutation: {
    postMessage: async (_, { channelId, message }, { req }) => {
      const postedMessage = await getCustomRepository(MessageRepository).postMessage({ channelId, message, req })
      pubsub.publish(MESSAGE_POSTED, { postedMessage })
      return postedMessage
    },
    // editMessage: async (_, { messageId }) => {
    //   return await getCustomRepository(MessageRepository).editMessage({ messageId })
    // },
    // deleteMessage: async (_, { messageId }) => {
    //   return await getCustomRepository(MessageRepository).deleteMessage({ messageId })
    // }
  },

  Subscription: {
    postedMessage: {
      subscribe: () => pubsub.asyncIterator([MESSAGE_POSTED])
    }
  }
}

export default resolvers