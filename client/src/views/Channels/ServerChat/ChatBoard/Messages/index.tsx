import React, { useEffect, useRef, useLayoutEffect, useState } from 'react'
import { useQuery } from 'react-apollo-hooks'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import style from './Messages.module.css'
import { useMe } from '../../../../../services/requireAuth'
import MoreVert from '@material-ui/icons/MoreVert'
import { message } from '../../../../../graphql/fragments'
import { GET_MESSAGES } from '../../../../../graphql/queries'
import { Message, Channel } from '../../../../../graphql/types'
import MessageSnackbar from './MessageSnackbar'

type Params = {
  channelId: string
  serverId: string
}

type Props = RouteComponentProps<Params> & {
  channel: Channel
  messages: [Message]
}

const Messages = ({ channel, messages, location }: Props) => {
  const me = useMe()
  const [jump, handleJump] = useState(false)
  const messageContainer = useRef(null)
  const messagesEnd = useRef(null)
  const lastMessage = useRef(null)

  useEffect(() => {
    // Scroll to bottom on mount
    messageContainer.current.scrollTop = messageContainer.current.scrollHeight
  }, [])
  useEffect(() => {
    // Scroll to bottom on route change
    messageContainer.current.scrollTop = messageContainer.current.scrollHeight
  }, [location.pathname])
  useEffect(() => {
    if (messages.length) {
      const count = messageContainer.current.childElementCount
      const newestMessage = messageContainer.current.childNodes[count - 2]
      // If scrolled down to AT LEAST 90% of the list --> scroll to bottom
      if (
        messageContainer.current.scrollTop + newestMessage.scrollHeight >
        (messageContainer.current.scrollHeight -
          messageContainer.current.clientHeight) *
          0.9
      ) {
        messagesEnd.current.scrollIntoView({ behavior: 'smooth' })
      } else if (messages.length > 3) {
        handleJump(true)
      }
    }
  }, [messages.length])

  const renderOptions = message => {
    return (
      <div className={style.options}>
        {me.id === message.sender.id ? (
          <MoreVert className={style.verticalIcon} />
        ) : null}
      </div>
    )
  }

  return (
    <React.Fragment>
      <div className={style.scroller} ref={messageContainer}>
        {messages.map(message => {
          return (
            <div
              className={style.messageWrapper}
              key={message.id}
              ref={
                messages[messages.length - 1].id === message.id
                  ? lastMessage
                  : null
              }
            >
              <div className={style.messageContainer}>
                <div className={style.messageHeaderWrapper}>
                  <div className={style.userAvatarContainer} />
                  <div className={style.messageHeader}>
                    <span className={style.name}>{message.sender.name}</span>
                    <time className={style.time}>{message.createdAt}</time>
                  </div>
                </div>

                <div className={style.messageContainer}>
                  <div className={style.message}>
                    <div className={style.messageText}>{message.message}</div>
                    {renderOptions(message)}
                  </div>
                </div>
              </div>

              <hr className={[style.divider, style.enabled].join(' ')} />
            </div>
          )
        })}

        <div className={style.bottom} ref={messagesEnd} />
      </div>
      <MessageSnackbar
        open={jump}
        handleOpen={handleJump}
        channel={channel}
        messagesEnd={messagesEnd}
      />
    </React.Fragment>
  )
}

export default withRouter(Messages)
