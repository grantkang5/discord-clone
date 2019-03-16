import { PubSub } from 'apollo-server-express'
import { IResolvers } from 'graphql-tools'
import { getCustomRepository } from 'typeorm'
import { User } from '../../entity/User'
import UserRepository from './repository'
import { USER_CREATED, USER_LOGGED_IN, USER_LOGGED_OUT } from '../subscriptions'

const pubsub = new PubSub()

export const resolvers: IResolvers = {
  Query: {
    users: async () => {
      const users = await User.find()
      if (!users.length) {
        return new Error('No users found')
      }

      return users
    },
    user: async (_, { id }: { id: number }) => {
      return await getCustomRepository(UserRepository).findById(id)
    },
    me: async (_, __, { req }) => {
      return req.user
    },
    usersByName: async (_, { name }) => {
      return await getCustomRepository(UserRepository).getUsersByName({ name })
    }
  },

  Mutation: {
    editName: async (_, { userId, name }) => {
      return await getCustomRepository(UserRepository).editName({ userId, name })
    },
    logOut: async (_, __, { req, res }) => {
      const { user } = req
      req.logout()
      pubsub.publish(USER_LOGGED_OUT, { userLoggedOut: user })
      res.clearCookie('jwt', { path: '/' })
      return user
    }
  },

  Subscription: {
    userCreated: {
      subscribe: () => pubsub.asyncIterator([USER_CREATED])
    },
    userLoggedIn: {
      subscribe: () => pubsub.asyncIterator([USER_LOGGED_IN])
    },
    userLoggedOut: {
      subscribe: () => pubsub.asyncIterator([USER_LOGGED_OUT])
    }
  }
}

export default resolvers
