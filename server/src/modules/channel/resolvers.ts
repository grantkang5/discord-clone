import { IResolvers } from "graphql-tools";
import { getCustomRepository } from 'typeorm'
import ChannelRepository from './repository'
import { CHANNEL_DELETED, CHANNEL_CHANGED, CHANNEL_CREATED, pubsub } from "../subscriptions";

const resolvers: IResolvers = {
  Query: {
    getServerChannels: async (_, { serverId }) => {
      return await getCustomRepository(ChannelRepository).getServerChannels({ serverId })
    }
  },

  Mutation: {
    createChannel: async (_, { serverId, type, name }) => {
      const channel = await getCustomRepository(ChannelRepository).createChannel({ serverId, type, name })
      pubsub.publish(CHANNEL_CREATED, { createdChannel: channel })
      return channel
    },
    deleteChannel: async (_, { channelId }) => {
      const channel = await getCustomRepository(ChannelRepository).deleteChannel({ channelId })
      pubsub.publish(CHANNEL_DELETED, { deletedChannel: channel })
      return channel
    },
    changeChannel: async (_, { channelId, name }) => {
      const channel = await getCustomRepository(ChannelRepository).changeChannel({ channelId, name })
      pubsub.publish(CHANNEL_CHANGED, { changedChannel: channel })
      return channel
    }
  },

  Subscription: {
    deletedChannel: {
      subscribe: () => pubsub.asyncIterator([CHANNEL_DELETED])
    },
    changedChannel: {
      subscribe: () => pubsub.asyncIterator([CHANNEL_CHANGED])
    },
    createdChannel: {
      subscribe: () => pubsub.asyncIterator([CHANNEL_CREATED])
    }
  }
}

export default resolvers