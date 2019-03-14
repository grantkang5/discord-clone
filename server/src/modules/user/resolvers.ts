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
      const userLoggedIn = await getCustomRepository(UserRepository).signIn({
        email,
        password,
        req
      })
      pubsub.publish(USER_LOGGED_IN, { userLoggedIn })
      return userLoggedIn
    },
    logOut: async (_, __, { req }) => {
      const { user } = req // save user before logging out
      req.logout()
      pubsub.publish(USER_LOGGED_OUT, { userLoggedOut: user })
      return user
    },
    editName: async (_, { userId, name }) => {
      return await getCustomRepository(UserRepository).editName({ userId, name })
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
