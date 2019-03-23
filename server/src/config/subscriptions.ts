import {
  USER_LOGGED_IN,
  USER_LOGGED_OUT,
  redisPubSub
} from '../modules/subscriptions'
import * as jwt from 'jsonwebtoken'
import { redisClient } from '..'
import { jwtConfig } from './passport'
import { User } from '../entity/User'

export const onConnect = (_, webSocket) => {
  const match = webSocket['upgradeReq'].headers.cookie.match(
    new RegExp('(^| )' + 'jwt' + '=([^;]+)')
  )
  const authToken = match[2]
    .substr(4)
    .split('.', 3)
    .join('.')

  if (authToken) {
    jwt.verify(
      authToken,
      jwtConfig.jwt.secret,
      jwtConfig.cookie,
      async (err, { user }) => {
        if (err) throw new Error(err)
        redisClient.hset('users', authToken, user)
        const verifiedUser = await User.findOne({ id: user })
        redisPubSub.publish(USER_LOGGED_IN, { userLoggedIn: verifiedUser })
      }
    )
  }
}

export const onDisconnect = webSocket => {
  const conn = webSocket['upgradeReq'].headers.cookie
  if (conn) {
    const match = webSocket['upgradeReq'].headers.cookie.match(
      new RegExp('(^| )' + 'jwt' + '=([^;]+)')
    )
    const authToken = match[2]
      .substr(4)
      .split('.', 3)
      .join('.')

    if (authToken) {
      jwt.verify(
        authToken,
        jwtConfig.jwt.secret,
        jwtConfig.cookie,
        async (err, decoded) => {
          if (err) {
            if (err.name === 'TokenExpiredError') {
              redisClient.hdel('users', authToken)
              const userId = redisClient.hget('users', authToken)
              const verifiedUser = await User.findOne({ id: userId })
              redisPubSub.publish(USER_LOGGED_OUT, {
                uesrLoggedOut: verifiedUser
              })
            }
          } else if (decoded) {
            redisClient.hdel('users', authToken)
            const verifiedUser = await User.findOne({ id: decoded.user })
            redisPubSub.publish(USER_LOGGED_OUT, {
              userLoggedOut: verifiedUser
            })
          }
        }
      )
    }
  }
}
