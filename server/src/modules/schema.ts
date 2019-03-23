import { makeExecutableSchema } from 'apollo-server-express';
import { merge } from 'lodash';
import { UserResolvers, UserSchema } from './user';
import { ServerSchema, ServerResolvers } from './server';
import { ChannelSchema, ChannelResolvers } from './channel';
import { InvitationSchema, InvitationResolvers } from './invitation';
import { MessageSchema, MessageResolvers } from './message';

const schema = makeExecutableSchema({
  typeDefs: [
    UserSchema,
    ServerSchema,
    ChannelSchema,
    InvitationSchema,
    MessageSchema
  ],
  resolvers: merge(
    UserResolvers,
    ServerResolvers,
    ChannelResolvers,
    InvitationResolvers,
    MessageResolvers
  )
})

export default schema