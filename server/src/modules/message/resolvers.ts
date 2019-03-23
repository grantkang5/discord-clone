import { IResolvers } from "graphql-tools";
import { getCustomRepository } from 'typeorm'
import MessageRepository from './repository'

const resolvers: IResolvers = {
  Query: {
    getMessages: async (_, { channelId }) => {
      return await getCustomRepository(MessageRepository).getMessages({ channelId })
    },
    // getUserMessages: async (_, { userId }) => {
    //   return await getCustomRepository(MessageRepository).getUserMessages({ userId })
    // }
  },

  Mutation: {
    postMessage: async (_, { channelId, message }, { req }) => {
      return await getCustomRepository(MessageRepository).postMessage({ channelId, message, req })
    },
    // editMessage: async (_, { messageId }) => {
    //   return await getCustomRepository(MessageRepository).editMessage({ messageId })
    // },
    // deleteMessage: async (_, { messageId }) => {
    //   return await getCustomRepository(MessageRepository).deleteMessage({ messageId })
    // }
  }
}

export default resolvers