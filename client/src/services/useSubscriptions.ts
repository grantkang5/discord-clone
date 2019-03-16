import { defaultDataIdFromObject } from 'apollo-cache-inmemory'
import { useSubscription } from 'react-apollo-hooks'
import { DELETED_SERVER, USER_LOGGED_OUT, SENT_INVITATION } from '../graphql/subscriptions'
import * as queries from '../graphql/queries'
import history from '../config/history';

export const useSubscriptions = () => {
  /** DeleteServer subscription */
  useSubscription(DELETED_SERVER, {
    onSubscriptionData: async ({ client, subscriptionData: { data } }) => {
      let servers
      try {
        servers = await client.readQuery({
          query: queries.GET_USER_SERVERS,
          variables: { userId: data.deletedServer.host.id }
        })
      } catch (e) {
        history.push('/')
      }

      if (servers.userServers) {
        client.writeQuery({
          query: queries.GET_USER_SERVERS,
          variables: { userId: data.deletedServer.host.id },
          data: {
            userServers: servers.userServers.filter(
              server => server.id !== data.deletedServer.id
            )
          }
        })
      }
    }
  })

  /** invitation sub */
  useSubscription(SENT_INVITATION, {
    onSubscriptionData: async ({ client, subscriptionData: { data } }) => {}
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
