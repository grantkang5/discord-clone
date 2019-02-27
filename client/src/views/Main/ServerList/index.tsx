import React from 'react'
import style from './ServerList.module.css'
import { useQuery } from 'react-apollo-hooks';
import { GET_USER_SERVERS } from '../../../graphql/queries';
import { useMe } from '../../../services/requireAuth';
import ServerIcon from './ServerIcon';

const ServerList = () => {
  const me = useMe()
  const { data } = useQuery(GET_USER_SERVERS, {
    variables: { userId: me.id },
    suspend: true
  })

  return (
    <div className={style.serverList}>
      <ServerIcon name={'Home'} active={true} />
      <hr />
      {
        data.userServers.map(server => {
          return (
            <ServerIcon key={server.id} name={server.name} active={false} />
          )
        })
      }
    </div>
  )
}

export default ServerList