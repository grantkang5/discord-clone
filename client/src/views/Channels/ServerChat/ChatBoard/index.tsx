import React from 'react'
import style from './ChatBoard.module.css'
import MessageForm from './MessageForm'
import Messages from './Messages'

const ChatBoard = ({ channel }) => {
  return (
    <div className={style.chatContainer}>
      <React.Fragment>
        <div className={style.messagesWrapper}>
          <div className={style.scrollerWrapper}>
            <div className={style.scroller}>
              <Messages channel={channel} />
            </div>
          </div>
        </div>

        <MessageForm channel={channel} />
      </React.Fragment>
    </div>
  )
}

export default ChatBoard
