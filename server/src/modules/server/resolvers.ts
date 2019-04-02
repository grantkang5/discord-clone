import { IResolvers } from 'graphql-tools'
import { getCustomRepository } from 'typeorm'
import { Server } from '../../entity/Server'
import ServerRepository from './repository'
import {
  pubsub,
  SERVER_DELETED,
  USER_JOINED_SERVER,
  USER_LEFT_SERVER
} from '../subscriptions'

const resolvers: IResolvers = {
  Query: {
    server: async (_, { serverId }, { req }) => {
      try {
        return await getCustomRepository(ServerRepository).server({
          serverId,
          req
        })
      } catch (error) {
        throw new Error(error)
      }
    },
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
    createServer: async (
      _,
      { name, userId }: { name: string; userId: number }
    ) => {
      return await getCustomRepository(ServerRepository).createServer({
        name,
        userId
      })
    },
    deleteServer: async (_, { serverId }: { serverId: number }) => {
      const deletedServer = await getCustomRepository(
        ServerRepository
      ).deleteServer({ serverId })
      pubsub.publish(SERVER_DELETED, { deletedServer })
      return deletedServer
    },
    joinServer: async (
      _,
      { serverId, userId }: { serverId: number; userId: number }
    ) => {
      const server = await getCustomRepository(ServerRepository).joinServer({
        serverId,
        userId
      })
      return await server
    },
    acceptServerInvitation: async (_, { invitationId }) => {
      const server = await getCustomRepository(
        ServerRepository
      ).acceptServerInvitation({ invitationId })
      return await server
    },
    removeUserFromServer: async (_, { serverId, userId }) => {
      return await getCustomRepository(ServerRepository).removeUserFromServer({
        serverId,
        userId
      })
    }
  },

  Subscription: {
    deletedServer: {
      subscribe: () => pubsub.asyncIterator([SERVER_DELETED])
    },
    userJoinedServer: {
      subscribe: () => pubsub.asyncIterator([USER_JOINED_SERVER])
    },
    removedUser: {
      subscribe: () => pubsub.asyncIterator([USER_LEFT_SERVER])
    }
  }
}

export default resolvers
