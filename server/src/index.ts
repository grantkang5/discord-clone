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
import { jwtConfig } from './config/passport';

const PORT = 5000
const path ='/graphql'

createConnection().then(async () => {
  const app = express()
    .use(cookieParser(jwtConfig.jwt.secret, jwtConfig.cookie))
    .use(cors())
    .use(bodyParser.json())
    .use(helmet())

  app.use(passport.initialize())
  app.use('/auth', auth)

  const apolloServer = new ApolloServer({
    schema,
    context: ({ req }) => ({ req }),
    subscriptions: {
      onConnect: (_, webSocket) => {
        const ws = webSocket['upgradeReq']
        const authToken = ws['headers']['cookie'].slice(4)
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
