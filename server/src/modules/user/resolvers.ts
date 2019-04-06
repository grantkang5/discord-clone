import { IResolvers } from 'graphql-tools'
import { getCustomRepository } from 'typeorm'
import { User } from '../../entity/User'
import UserRepository from './repository'
import { redisPubSub, USER_LOGGED_OUT, USER_LOGGED_IN } from '../subscriptions'
import { redisClient } from '../..'

export const resolvers: IResolvers = {
  Query: {
    users: async () => {
      const users = await User.find()
      if (!users.length) {
        return new Error('No users found')
      }

      return users
    },
    onlineUsers: async (_, { serverId }) => {
      return await getCustomRepository(UserRepository).onlineUsers({ serverId })
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
      return await getCustomRepository(UserRepository).editName({
        userId,
        name
      })
    },
    logOut: async (_, __, { req, res }) => {
      const { user } = req
      await req.logout()
      await redisClient.hdel('users', req.headers.authorization.slice(7))
      const verifiedUser = await User.findOne({ id: user.id })
      redisPubSub.publish(USER_LOGGED_OUT, { userLoggedOut: verifiedUser })
      await res.clearCookie('jwt', { path: '/' })
      return user
    },
    editUser: async (
      _,
      { userId, email, name, currentPassword, newPassword, avatar }
    ) => {
      return await getCustomRepository(UserRepository).editUser({
        userId,
        email,
        name,
        currentPassword,
        newPassword,
        avatar
      })
    }
  },

  Subscription: {
    userLoggedIn: {
      subscribe: () => redisPubSub.asyncIterator(USER_LOGGED_IN)
    },
    userLoggedOut: {
      subscribe: () => redisPubSub.asyncIterator(USER_LOGGED_OUT)
    }
  }
}

export default resolvers
