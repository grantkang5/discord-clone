import { defaultDataIdFromObject } from 'apollo-cache-inmemory'
import { useSubscription } from 'react-apollo-hooks'
import {
  DELETED_SERVER,
  SENT_INVITATION,
  USER_JOINED_SERVER,
  CREATED_CHANNEL,
  DELETED_CHANNEL,
  SUBSCRIBED_USERS,
  USER_LOGGED_IN,
  USER_LOGGED_OUT
} from '../../graphql/subscriptions'
import * as queries from '../../graphql/queries'
import * as fragments from '../../graphql/fragments'
import history from '../../config/history'
import { CURRENT_USER } from '../../graphql/queries'
import { find, unionBy } from 'lodash'

/** TODO - Organize subscriptions by modules */
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
          client.writeQuery({
            query: queries.GET_RECEIVED_INVITATIONS,
            variables: { userId: me.id },
            data: {
              getReceivedInvitations: [
                ...getReceivedInvitations,
                data.sentInvitation
              ]
            }
          })
        } catch (error) {
          throw new Error(error)
        }
      }
    }
  })

  useSubscription(USER_JOINED_SERVER, {
    onSubscriptionData: async ({ client, subscriptionData: { data } }) => {
      try {
        const { me } = client.readQuery({
          query: queries.CURRENT_USER
        })
        const { userServers } = client.readQuery({
          query: queries.GET_USER_SERVERS,
          variables: { userId: me.id }
        })
        const foundServer = find(
          userServers,
          server => server.id === data.userJoinedServer.id
        )
        if (foundServer) {
          client.writeQuery({
            query: queries.GET_SERVER,
            variables: { serverId: data.userJoinedServer.id },
            data: {
              server: data.userJoinedServer
            }
          })
        }
      } catch (error) {
        throw new Error(error)
      }
    }
  })

  /** Channel Subscriptions */
  useSubscription(CREATED_CHANNEL, {
    onSubscriptionData: async ({ client, subscriptionData: { data } }) => {
      try {
        const { me } = client.readQuery({
          query: queries.CURRENT_USER
        })

        const foundUser = find(
          data.createdChannel.server.users,
          user => user.id === me.id
        )
        if (foundUser) {
          const { server } = client.readQuery({
            query: queries.GET_SERVER,
            variables: { serverId: data.createdChannel.server.id }
          })

          client.writeQuery({
            query: queries.GET_SERVER,
            variables: { serverId: data.createdChannel.server.id },
            data: {
              server: {
                ...server,
                channels: [...server.channels, data.createdChannel]
              }
            }
          })
        }
      } catch (error) {
        throw new Error(error)
      }
    }
  })

  useSubscription(DELETED_CHANNEL, {
    onSubscriptionData: async ({ client, subscriptionData: { data } }) => {
      try {
        const { me } = client.readQuery({ query: queries.CURRENT_USER })
        const foundUser = find(
          data.deletedChannel.server.users,
          user => user.id === me.id
        )
        if (foundUser) {
          const { server } = client.readQuery({
            query: queries.GET_SERVER,
            variables: { serverId: data.deletedChannel.server.id }
          })

          client.writeQuery({
            query: queries.GET_SERVER,
            variables: { serverId: data.deletedChannel.server.id },
            data: {
              server: {
                ...server,
                channels: server.channels.filter(
                  channel => channel.id !== data.deletedChannel.id
                )
              }
            }
          })
        }
      } catch (error) {
        throw new Error(error)
      }
    }
  })

  useSubscription(USER_LOGGED_IN, {
    onSubscriptionData: async ({ client, subscriptionData: { data } }) => {
      try {
        const { me } = await client.readQuery({ query: queries.CURRENT_USER })
        if (data.userLoggedIn.id === me.id) {
          return null
        } else {
          const { userServers } = await client.readQuery({
            query: queries.GET_USER_SERVERS,
            variables: { userId: me.id }
          })
          const serversWithUser = userServers.filter(server => {
            return find(server.users, user => user.id === data.userLoggedIn.id)
          })

          if (serversWithUser) {
            serversWithUser.map(async server => {
              const { onlineUsers } = await client.readQuery({
                query: queries.ONLINE_USERS,
                variables: { serverId: server.id }
              })

              client.writeQuery({
                query: queries.ONLINE_USERS,
                variables: { serverId: server.id },
                data: {
                  onlineUsers: unionBy(onlineUsers, [data.userLoggedIn], 'id')
                }
              })
            })
          }
        }
      } catch (err) {
        console.log(err)
      }
    }
  })

  useSubscription(USER_LOGGED_OUT, {
    onSubscriptionData: async ({ client, subscriptionData: { data } }) => {
      try {
        const { me } = await client.readQuery({ query: queries.CURRENT_USER })
        if (data.userLoggedOut.id === me.id) {
          return null
        } else {
          const { userServers } = await client.readQuery({
            query: queries.GET_USER_SERVERS,
            variables: { userId: me.id }
          })
          const serversWithUser = userServers.filter(server => {
            return find(server.users, user => user.id === data.userLoggedOut.id)
          })

          if (serversWithUser) {
            serversWithUser.map(async server => {
              const { onlineUsers } = await client.readQuery({
                query: queries.ONLINE_USERS,
                variables: { serverId: server.id }
              })

              client.writeQuery({
                query: queries.ONLINE_USERS,
                variables: { serverId: server.id },
                data: {
                  onlineUsers: onlineUsers.filter(
                    user => user.id !== data.userLoggedOut.id
                  )
                }
              })
            })
          }
        }
      } catch (err) {
        console.log(err)
      }
    }
  })
}
