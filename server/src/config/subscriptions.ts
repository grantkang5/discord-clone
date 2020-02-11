import {
  USER_LOGGED_IN,
  USER_LOGGED_OUT,
  redisPubSub
} from '../modules/subscriptions'
import jwt from 'jsonwebtoken'
import { jwtConfig } from './passport'
import { redisClient } from '..'
import { User } from '../entity/User'

export const onConnect = async (connectionParams: any) => {
  const authToken = connectionParams.authToken
  try {
    const decoded: any = jwt.verify(
      authToken,
      process.env.JWT_SECRET!,
      jwtConfig.jwt.options
    )
    redisClient.hset('users', authToken, decoded.user)
    const verifiedUser = await User.findOne({ id: decoded.user })
    redisPubSub.publish(USER_LOGGED_IN, { userLoggedIn: verifiedUser })
    return { authToken }
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      const userId = await redisClient.hget('users', authToken)
      redisClient.hdel('users', authToken)
      if (userId) {
        const verifiedUser = await User.findOne({ id: parseInt(userId) })
        redisPubSub.publish(USER_LOGGED_OUT, {
          userLoggedOut: verifiedUser
        })
      }
      throw new Error('Token expired')
    } else {
      throw new Error('Missing token')
    }
  }
}

export const onDisconnect = async (_: any, webSocket: any) => {
  const ws = await webSocket['initPromise']
  const authToken = ws.authToken
  if (authToken) {
    try {
      const decoded = jwt.verify(authToken, process.env.JWT_SECRET!, jwtConfig.jwt.options)
      redisClient.hdel('users', authToken)
      const verifiedUser = await User.findOne({ id: (decoded as any).user })
      redisPubSub.publish(USER_LOGGED_OUT, {
        userLoggedOut: verifiedUser
      })
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        redisClient.hdel('users', authToken)
        const userId = await redisClient.hget('users', authToken)
        if (!userId) throw new Error('No user')
        const verifiedUser = await User.findOne({ id: parseInt(userId) })
        redisPubSub.publish(USER_LOGGED_OUT, {
          userLoggedOut: verifiedUser
        })
      }
      throw new Error('Token expired')
    }
  }
}
