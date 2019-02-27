import { IResolvers } from "graphql-tools";
import { getCustomRepository } from 'typeorm'
import { Server } from "../../entity/Server";
import ServerRepository from './repository'

const resolvers: IResolvers = {
  Query: {
    servers: async () => {
      try {
        const servers = await Server.find()
        return servers
      } catch (error) {
        return new Error(error)
      }
    },
    userServers: async (_, { userId }: { userId: number }) => {
      return await getCustomRepository(ServerRepository).getUserServers(userId)
    }
  },

  Mutation: {
    createServer: async (_, { name, userId }: { name: string, userId: number }) => {
      return await getCustomRepository(ServerRepository).createServer({ name, userId })
    },
    deleteServer: async (_, { serverId }: { serverId: number }) => {
      return await getCustomRepository(ServerRepository).deleteServer({ serverId })
    },
    addUserToServer: async (_, { serverId, userId }: { serverId: number, userId: number }) => {
      return await getCustomRepository(ServerRepository).addUserToServer({ serverId, userId })
    }
  }
}

export default resolvers