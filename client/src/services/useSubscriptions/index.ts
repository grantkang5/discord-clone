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
  USER_LOGGED_OUT,
  POSTED_MESSAGE,
  USER_LEFT_SERVER
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

  useSubscription(USER_LEFT_SERVER, {
    onSubscriptionData: async ({
      client,
      subscriptionData: {
        data: { removedUser }
      }
    }) => {
      try {
        const { me } = client.readQuery({
          query: queries.CURRENT_USER
        })

        const { userServers } = client.readQuery({
          query: queries.GET_USER_SERVERS,
          variables: { userId: me.id }
        })

        if (me.id === removedUser.user.id) {
          await client.writeQuery({
            query: queries.GET_USER_SERVERS,
            variables: { userId: me.id },
            data: {
              userServers: userServers.filter(server => server.id !== removedUser.server.id)
            }
          })
        }

        const foundServer = find(
          userServers,
          server => server.id === removedUser.server.id
        )
        if (foundServer) {
          await client.writeQuery({
            query: queries.GET_SERVER,
            variables: { serverId: removedUser.server.id },
            data: { 
              server: removedUser.server
            }
          })

          try {
            const { onlineUsers } = await client.readQuery({
              query: queries.ONLINE_USERS,
              variables: { serverId: removedUser.server.id }
            })

            client.writeQuery({
              query: queries.ONLINE_USERS,
              variables: { serverId: removedUser.server.id },
              data: {
                onlineUsers: onlineUsers.filter(user => user.id !== removedUser.user.id)
              }
            })
          } catch (error) {
            const {
              data: { onlineUsers }
            } = await client.query({
              query: queries.ONLINE_USERS,
              variables: { serverId: removedUser.server.id }
            })

            client.writeQuery({
              query: queries.ONLINE_USERS,
              variables: { serverId: removedUser.server.id },
              data: {
                onlineUsers: onlineUsers.filter(user => user.id !== removedUser.user.id)
              }
            })
          }
        }
      } catch (error) {
        //
      }
    }
  })

  useSubscription(USER_JOINED_SERVER, {
    onSubscriptionData: async ({
      client,
      subscriptionData: {
        data: { userJoinedServer }
      }
    }) => {
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
          server => server.id === userJoinedServer.server.id
        )
        if (foundServer) {
          await client.writeQuery({
            query: queries.GET_SERVER,
            variables: { serverId: userJoinedServer.server.id },
            data: {
              server: userJoinedServer.server
            }
          })

          try {
            const { onlineUsers } = await client.readQuery({
              query: queries.ONLINE_USERS,
              variables: { serverId: userJoinedServer.server.id }
            })

            client.writeQuery({
              query: queries.ONLINE_USERS,
              variables: { serverId: userJoinedServer.server.id },
              data: {
                onlineUsers: unionBy(onlineUsers, [userJoinedServer.user], 'id')
              }
            })
          } catch (error) {
            const {
              data: { onlineUsers }
            } = await client.query({
              query: queries.ONLINE_USERS,
              variables: { serverId: userJoinedServer.server.id }
            })

            client.writeQuery({
              query: queries.ONLINE_USERS,
              variables: { serverId: userJoinedServer.server.id },
              data: {
                onlineUsers: unionBy(onlineUsers, [userJoinedServer.user], 'id')
              }
            })
          }
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

  /** Message subscriptions */
  useSubscription(POSTED_MESSAGE, {
    onSubscriptionData: async ({ client, subscriptionData: { data } }) => {
      try {
        const { getMessages } = client.readQuery({
          query: queries.GET_MESSAGES,
          variables: { channelId: data.postedMessage.channel.id }
        })

        client.writeQuery({
          query: queries.GET_MESSAGES,
          variables: { channelId: data.postedMessage.channel.id },
          data: {
            getMessages: [data.postedMessage, ...getMessages]
          }
        })
      } catch (error) {
        // Notifications api?
      }
    }
  })

  /** Authentication subscriptions */
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
          const myServers = userServers.filter(server => {
            return find(server.users, user => user.id === data.userLoggedIn.id)
          })

          if (myServers) {
            myServers.map(async server => {
              try {
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
              } catch (error) {
                const {
                  data: { onlineUsers }
                } = await client.query({
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
              }
            })
          }
        }
      } catch (error) {
        // Do nothing?
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
          const myServers = userServers.filter(server => {
            return find(server.users, user => user.id === data.userLoggedOut.id)
          })

          if (myServers) {
            myServers.map(async server => {
              try {
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
              } catch (error) {
                const {
                  data: { onlineUsers }
                } = await client.query({
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
              }
            })
          }
        }
      } catch (error) {
        // Not queried
      }
    }
  })
}
