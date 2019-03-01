import { makeExecutableSchema } from 'apollo-server-express';
import { merge } from 'lodash';
import { UserResolvers, UserSchema } from './user';
import { ServerSchema, ServerResolvers } from './server';
import { ChannelSchema, ChannelResolvers } from './channel';
import { InvitationSchema, InvitationResolvers } from './invitation';

const schema = makeExecutableSchema({
  typeDefs: [
    UserSchema,
    ServerSchema,
    ChannelSchema,
    InvitationSchema
  ],
  resolvers: merge(
    UserResolvers,
    ServerResolvers,
    ChannelResolvers,
    InvitationResolvers
  )
})

export default schema