import React from 'react'
import style from './ChatBoard.module.css'
import MessageForm from './MessageForm'
import Messages from './Messages'
import { useQuery } from 'react-apollo-hooks'
import { GET_MESSAGES } from '../../../../graphql/queries'

const ChatBoard = ({ channel }) => {
  const { data, loading, fetchMore } = useQuery(GET_MESSAGES, {
    variables: { channelId: channel.id }
  })

  if (loading) {
    return (
      <div className={style.chatContainer}>
        <div className={style.messageWrapper}>
          <div className={style.scrollerWrapper} />
        </div>
      </div>
    )
  }

  return (
    <div className={style.chatContainer}>
      <div className={style.messagesWrapper}>
        <div className={style.scrollerWrapper}>
          <Messages
            channel={channel}
            messages={data.getMessages}
            fetchMore={fetchMore}
          />
        </div>
      </div>

      <MessageForm channel={channel} />
    </div>
  )
}

export default ChatBoard
