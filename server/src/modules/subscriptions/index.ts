import { PubSub } from 'apollo-server-express'
import { RedisPubSub } from 'graphql-redis-subscriptions'
import Redis from 'ioredis'
import redisConf from '../../config/redisConf';


/** User Subsriptions */
export const USER_CREATED = 'USER_CREATED'
export const USER_LOGGED_IN = 'USER_LOGGED_IN'
export const USER_LOGGED_OUT = 'USER_LOGGED_OUT'

/** Server Subscriptions */
export const SERVER_DELETED = 'SERVER_DELETED'
export const USER_JOINED_SERVER = 'USER_JOINED_SERVER'
export const USER_LEFT_SERVER = 'USER_LEFT_SERVER'

/** Invitation Subscriptions */
export const INVITATION_SENT = 'INVITATION_SENT'
export const INVITATION_DELETED = 'INVITATION_DELETED'

/** Channel Subscriptions */
export const CHANNEL_CREATED = 'CHANNEL_CREATED'
export const CHANNEL_DELETED = 'CHANNEL_DELETED'
export const CHANNEL_CHANGED = 'CHANNEL_CHANGED'

/** Message Susbcription */
export const MESSAGE_POSTED = 'MESSAGE_POSTED'
export const MESSAGE_DELETED = 'MESSAGE_DELETED'
export const MESSAGE_CHANGED = 'MESSAGE_CHANGED'

export const pubsub = new PubSub()

export const redisPubSub = new RedisPubSub({
  publisher: new Redis(redisConf),
  subscriber: new Redis(redisConf)
}) 