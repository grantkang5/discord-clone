import { makeExecutableSchema } from 'apollo-server-express';
import { merge } from 'lodash';
import { UserResolvers, UserSchema } from './user';
import { ServerSchema, ServerResolvers } from './server';

const schema = makeExecutableSchema({
  typeDefs: [
    UserSchema,
    ServerSchema
  ],
  resolvers: merge(
    UserResolvers,
    ServerResolvers
  )
})

export default schema