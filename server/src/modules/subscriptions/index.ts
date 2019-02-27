import { PubSub } from 'apollo-server-express'

export const USER_CREATED = 'USER_CREATED'

export const pubsub = new PubSub()