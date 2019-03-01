import React from 'react'
import style from './ServerContent.module.css'
import HomeChannels from './HomeContent/HomeChannels'
import HomeHeader from './HomeContent/HomeHeader'
import ServerChannels from './ServerContent/ServerChannels'
import ServerHeader from './ServerContent/ServerHeader'
import { Server } from '../../../graphql/types';

interface Props {
  server: Server,
  serverId: string | number
}

const ServerContent = ({ server, serverId }: Props) => {
  if (!server) {
    return (
      <div className={style.serverContent}>
        <HomeHeader />
        <HomeChannels />
      </div>
    )
  }

  return (
    <div className={style.serverContent}>
      <ServerHeader server={server} serverId={serverId} />
      <ServerChannels />
    </div>
  )
}

export default ServerContent
