import React from 'react'
import ServerList from './ServerList'
import ServerContent from './ServerContent'
import style from './Channels.module.css'
import { GET_USER_SERVERS } from '../../graphql/queries'
import { useMe } from '../../services/requireAuth'
import { useQuery } from 'react-apollo-hooks'

const Channels = ({ match }) => {
  const me = useMe()
  const { data } = useQuery(GET_USER_SERVERS, {
    variables: { userId: me.id },
    suspend: true
  })

  const currentServer = data.userServers.find(
    server => server.id === match.params.serverId
  )

  return (
    <main className={style.mainApp}>
      <ServerList
        serverId={match.params.serverId}
        servers={data.userServers}
      />

      <div className={style.contentBox}>
        <ServerContent
          server={currentServer}
          serverId={match.params.serverId}
        />
      </div>
    </main>
  )
}

export default Channels
