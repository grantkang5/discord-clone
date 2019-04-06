import React, { useEffect } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import style from './ServerChat.module.css'
import Title from './Title';
import ChatBoard from './ChatBoard';
import Members from './Members';
import { useQuery } from 'react-apollo-hooks';
import { Server } from '../../../graphql/types';
import { GET_CHANNEL } from '../../../graphql/queries';

type Params = {
  channelId: string,
  serverId: string
}

type Props = RouteComponentProps<Params> & {
  server: Server
}

const ServerChat = ({ server, match }: Props) => {
  const { data } = useQuery(GET_CHANNEL, {
    variables: { channelId: match.params.channelId },
    suspend: true
  })

  useEffect(() => {
    document.title = `#${data.channel.name}`
  }, [data])

  return (
    <div className={style.chatContainer}>
      <Title channel={data.channel} />
      <div className={style.chatContent}>
        <ChatBoard channel={data.channel} />
        <Members server={server} />
      </div>
    </div>
  )
}

export default ServerChat