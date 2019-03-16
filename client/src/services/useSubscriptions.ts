import { defaultDataIdFromObject } from 'apollo-cache-inmemory'
import { useSubscription } from 'react-apollo-hooks'
import {
  DELETED_SERVER,
  USER_LOGGED_OUT,
  SENT_INVITATION
} from '../graphql/subscriptions'
import * as queries from '../graphql/queries'
import * as fragments from '../graphql/fragments'
import history from '../config/history'
import { CURRENT_USER } from '../graphql/queries'

export const useSubscriptions = () => {
  /** DeleteServer subscription */
  useSubscription(DELETED_SERVER, {
    onSubscriptionData: async ({ client, subscriptionData: { data } }) => {
      try {
        const { me } = client.readQuery({
          query: queries.CURRENT_USER
        })
        const servers = client.readQuery({
          query: queries.GET_USER_SERVERS,
          variables: { userId: me.id }
        })

        if (servers && servers.userServers) {
          client.writeQuery({
            query: queries.GET_USER_SERVERS,
            variables: { userId: me.id },
            data: {
              userServers: servers.userServers.filter(
                server => server.id !== data.deletedServer.id
              )
            }
          })
        } else {
          throw new Error("Can't find servers")
        }
      } catch (e) {
        console.log(e)
        return history.push('/')
      }
    }
  })

  /** invitation sub */
  useSubscription(SENT_INVITATION, {
    onSubscriptionData: async ({ client, subscriptionData: { data } }) => {
      const receiver = data.sentInvitation.receiver
      const { me } = client.readQuery({
        query: queries.CURRENT_USER
      })

      if (me.id === receiver.id) {
        try {
          const { getReceivedInvitations } = client.readQuery({
            query: queries.GET_RECEIVED_INVITATIONS,
            variables: { userId: me.id }
          })
          console.log('[GetReceivedInvitations]: ', getReceivedInvitations)
          client.writeQuery({
            query: queries.GET_RECEIVED_INVITATIONS,
            variables: { userId: me.id },
            data: {
              getReceivedInvitations: [...getReceivedInvitations, data.sentInvitation]
            }
          })
        } catch (error) {
          throw new Error(error)
        }
      }
    }
  })

  /** User logged out */
  useSubscription(USER_LOGGED_OUT, {
    onSubscriptionData: async ({ client, subscriptionData: { data } }) => {
      let user
      try {
        user = await client.readQuery({
          query: queries.CURRENT_USER
        })
      } catch (e) {
        console.log('[User Logged out Error]: ', e)
      }
      if (user.me) {
        client.clearStore().then(() => history.push('/'))
      }
    }
  })
}
