import { ApolloServer } from 'apollo-server-express'
import * as bodyParser from 'body-parser'
import * as cors from 'cors'
import * as express from 'express'
import * as session from 'express-session'
import * as helmet from 'helmet'
import { createServer } from 'http'
import * as passport from 'passport'
import { createConnection } from 'typeorm'
import schema from './modules/schema'

const RedisStore = require('connect-redis')(session)
const PORT = 5000
const expressSession = session({
  resave: true,
  saveUninitialized: true,
  secret: 'wiojfioqjo',
  name: 'qid',
  store: new RedisStore({
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT),
    logErrors: process.env.NODE_ENV === 'development'
  })
})

createConnection().then(async () => {
  const app = express()
    .use(cors())
    .use(bodyParser.json())
    .use(helmet())
    .use(expressSession)

  app.use(passport.initialize())
  app.use(passport.session())

  const apolloServer = new ApolloServer({
    schema,
    context: ({ req }) => ({ req }),
    subscriptions: {}
  })

  apolloServer.applyMiddleware({ app })

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
