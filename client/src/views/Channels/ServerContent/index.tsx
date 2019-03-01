import React from 'react'
import style from './ServerContent.module.css'
import Channels from './Channels'
import Header from './Header'
import { Server } from '../../../graphql/types';

interface Props {
  server: Server,
  serverId: string | number
}

const ServerContent = ({ server, serverId }: Props) => {
  if (!server) {
    return (
      <div className={style.serverContent}>
        WIP
      </div>
    )
  }

  return (
    <div className={style.serverContent}>
      <Header server={server} serverId={serverId} />
      <Channels />
    </div>
  )
}

export default ServerContent
