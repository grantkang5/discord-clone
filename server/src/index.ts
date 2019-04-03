import { ApolloServer } from 'apollo-server-express'
import * as bodyParser from 'body-parser'
import * as cors from 'cors'
import * as express from 'express'
import { createServer } from 'http'
import * as passport from 'passport'
import { createConnection } from 'typeorm'
import schema from './modules/schema'
import './config/passport'
import auth from './modules/auth'
import * as Redis from 'ioredis'
import { onConnect, onDisconnect } from './config/subscriptions'
import redisConf from './config/redisConf'
import * as rateLimit from 'express-rate-limit'
import './config/passport'

const PORT = 5000
const path = '/graphql'
// Setup redis
export const redisClient = new Redis(redisConf)

const authLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 10,
  message: "Too many authentication requests, please try again in 5 minutes"
})

createConnection().then(async () => {
  const app = express()
    .use(cors())
    .use(bodyParser.json())

  app.enable('trust proxy')
  app.use(passport.initialize())
  app.get('/check', (_, res) => res.status(200).send('hello'))
  app.use('/auth', authLimiter, auth)

  const apolloServer = new ApolloServer({
    schema,
    context: ({ req, res, connection }: any) => ({ req, res, connection }),
    subscriptions: {
      onConnect,
      onDisconnect
    }
  })

  app.use(path, passport.authenticate('jwt', { session: false }))
  apolloServer.applyMiddleware({ app, path })

  const ws = createServer(app)
  apolloServer.installSubscriptionHandlers(ws)

  ws.listen(PORT, () => {
    console.log(`--------------- Listening on PORT ${PORT} -----------------`)
  })
}).catch(error => console.log(`Typeorm Connection error: `, error))

/**
 * TODO - Create error handlers for repositories
 * TODO - Create tests for graphql resolvers
 */
