import { PubSub } from 'apollo-server-express'

/** User Subsriptions */
export const USER_CREATED = 'USER_CREATED'

/** Server Subscriptions */
export const SERVER_DELETED = 'SERVER_DELETED'

/** Invitation Subscriptions */
export const INVITATION_SENT = 'INVITATION_SENT'

/** Channel Subscriptions */

export const pubsub = new PubSub()