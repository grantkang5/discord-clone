import React from 'react'
import style from './ChatBoard.module.css'
import MessageForm from './MessageForm'
import Messages from './Messages'
import { useQuery } from 'react-apollo-hooks'
import { GET_MESSAGES } from '../../../../graphql/queries'

const ChatBoard = ({ channel }) => {
  const { data, loading } = useQuery(GET_MESSAGES, {
    variables: { channelId: channel.id }
  })

  if (loading) return null

  return (
    <div className={style.chatContainer}>
      <div className={style.messagesWrapper}>
        <div className={style.scrollerWrapper}>
          <Messages channel={channel} messages={data.getMessages} />
        </div>
      </div>

      <MessageForm channel={channel} />
    </div>
  )
}

export default ChatBoard
