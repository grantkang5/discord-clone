import { defaultDataIdFromObject } from 'apollo-cache-inmemory'
import { useSubscription } from 'react-apollo-hooks'
import { DELETED_SERVER } from '../graphql/subscriptions'
import * as queries from '../graphql/queries'

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
        console.log(e)
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
}
