import React, { useState, useEffect } from 'react'
import style from './ServerList.module.css'
import ServerIcon from './ServerIcon'
import { Server } from '../../../graphql/types'
import AddServer from './AddServer';

interface Props {
  serverId: string | number
  servers: [Server]
}

const ServerList = ({ serverId, servers }: Props) => {
  return (
    <div className={style.serverList}>
      <ServerIcon
        id="@me"
        name={'Home'}
        active={serverId === '@me' || !serverId}
      />
      <hr />
      {servers.map(server => {
        return (
          <ServerIcon
            key={server.id}
            id={server.id}
            name={server.name}
            active={server.id === serverId}
          />
        )
      })}

      <AddServer />
      <hr />
    </div>
  )
}

export default ServerList
