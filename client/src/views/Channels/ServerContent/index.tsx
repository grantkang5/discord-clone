import React from 'react'
import style from './ServerContent.module.css'
import HomeChannels from './HomeContent/HomeChannels'
import HomeHeader from './HomeContent/HomeHeader'
import ServerChannels from './ServerContent/ServerChannels'
import ServerHeader from './ServerContent/ServerHeader'
import { Server } from '../../../graphql/types';
import UserControls from './UserControls';

interface Props {
  server: Server,
  serverId: string | number
}

const ServerContent = ({ server, serverId }: Props) => {
  return (
    <div className={style.serverContent}>
      {
        server ? (
          <React.Fragment>
            <ServerHeader server={server} serverId={serverId} />
            <ServerChannels />
          </React.Fragment>
        ) : (
          <React.Fragment>
            <HomeHeader />
            <HomeChannels />
          </React.Fragment>
        )
      }
      <UserControls />
    </div>
  )
}

export default ServerContent
