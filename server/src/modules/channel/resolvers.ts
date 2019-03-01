import { IResolvers } from "graphql-tools";
import { getCustomRepository } from 'typeorm'
import ChannelRepository from './repository'

const resolvers: IResolvers = {
  Query: {
    getServerChannels: async(_, { serverId }) => {
      return await getCustomRepository(ChannelRepository).getServerChannels({ serverId })
    }
  },

  Mutation: {
 
  }
}

export default resolvers