import { PubSub } from 'apollo-server-express'
import { IResolvers } from 'graphql-tools'
import { getCustomRepository } from 'typeorm'
import { User } from '../../entity/User'
import UserRepository from './repository'
import { USER_CREATED } from '../subscriptions'

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
    }
  },

  Mutation: {
    signUp: async (
      _,
      { email, password }: { email: string; password: string },
      { req }: any
    ) => {
      const userCreated = await getCustomRepository(UserRepository).signUp({
        email,
        password,
        req
      })
      pubsub.publish(USER_CREATED, { userCreated })
      return userCreated
    },
    logIn: async (
      _,
      { email, password }: { email: string; password: string },
      { req }: any
    ) => {
      return await getCustomRepository(UserRepository).signIn({
        email,
        password,
        req
      })
    },
    logOut: async (_, __, { req }) => {
      const { user } = req // save user before logging out
      req.logout()
      return user
    }
  },

  Subscription: {
    userCreated: {
      subscribe: () => pubsub.asyncIterator([USER_CREATED])
    }
  }
}

export default resolvers
