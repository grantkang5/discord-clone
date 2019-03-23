import React from 'react'
import style from './ServerChat.module.css'
import Title from './Title';
import ChatBoard from './ChatBoard';
import Members from './Members';
import { useQuery } from 'react-apollo-hooks';
import { Server } from '../../../graphql/types';
import { useChannelState } from '../../../services/ChannelsProvider';

interface Props {
  server: Server,
}

const ServerChat = ({ server }: Props) => {
  const { activeChannel } = useChannelState()

  return (
    <div className={style.chatContainer}>
      <Title/>
      <div className={style.chatContent}>
        <ChatBoard />
        <Members server={server} />
      </div>
    </div>
  )
}

export default ServerChat