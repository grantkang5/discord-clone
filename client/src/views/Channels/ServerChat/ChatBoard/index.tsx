import React from 'react'
import style from './ChatBoard.module.css'
import MessageForm from './MessageForm'
import Messages from './Messages'
import { useChannelState } from '../../../../services/ChannelsProvider'
import { Loading } from '../../../../components/Loaders'

const ChatBoard = () => {
  const { activeChannel } = useChannelState()

  return (
    <div className={style.chatContainer}>
      {
        activeChannel ? (
          <React.Fragment>
            <div className={style.messagesWrapper}>
              <div className={style.scrollerWrapper}>
                <div className={style.scroller}>
                <Messages activeChannel={activeChannel} />
                </div>
              </div>
            </div>
      
            <MessageForm />
          </React.Fragment>
        ) : (
          <Loading />
        )
      }
    </div>
  )
}

export default ChatBoard
