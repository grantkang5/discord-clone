import { ApolloServer } from 'apollo-server-express'
import * as bodyParser from 'body-parser'
import * as cors from 'cors'
import * as express from 'express'
import * as cookieParser from 'cookie-parser'
import * as helmet from 'helmet'
import { createServer } from 'http'
import * as passport from 'passport'
import { createConnection } from 'typeorm'
import schema from './modules/schema'
import './config/passport'
import auth from './modules/auth'
import { jwtConfig } from './config/passport'
import * as redis from 'redis'
import * as jwt from 'jsonwebtoken'

const PORT = 5000
const path = '/graphql'
const redisClient = redis.createClient({
  host: process.env.REDIS_HOST,
  port: parseInt(process.env.REDIS_PORT),
  retry_strategy: () => 100
})
const redisPublisher = redisClient.duplicate()

createConnection().then(async () => {
  const app = express()
    .use(cookieParser(jwtConfig.jwt.secret, jwtConfig.cookie))
    .use(cors())
    .use(bodyParser.json())
    .use(helmet())

  app.use(passport.initialize())
  app.use('/auth', auth)
  app.use((err, _, res, next) => {
    console.log('ERROR: ', err)
    res.status(500)
    next(err)
  })

  const apolloServer = new ApolloServer({
    schema,
    context: ({ req, res }) => ({ req, res }),
    subscriptions: {
      onConnect: connectionParams => {
        const authToken = connectionParams['authToken']
        if (authToken) {
          jwt.verify(
            authToken,
            jwtConfig.jwt.secret,
            jwtConfig.cookie,
            (err, { user }) => {
              if (err) throw new Error(err)
              redisClient.hset('users', user, 'offline')
              redisPublisher.publish('insert', user)
              console.log(`User ${user} connected`)
            }
          )
        }
      }
    }
  })

  app.use(path, passport.authenticate('jwt', { session: false }))
  apolloServer.applyMiddleware({ app, path })

  const ws = createServer(app)
  apolloServer.installSubscriptionHandlers(ws)

  ws.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
  })
})

/**
 * TODO - Create error handlers for repositories
 * TODO - Create tests for graphql resolvers
 */
