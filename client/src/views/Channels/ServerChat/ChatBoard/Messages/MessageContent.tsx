import React from 'react'
import moment from 'moment'
import classNames from 'classnames'
import style from './Messages.module.css'
import MoreVert from '@material-ui/icons/MoreVert'
import { useMe } from '../../../../../services/auth.service'
import Avatar from '../../../../../components/Avatar';

const MessageContent = ({ message, index, previousMessage, nextMessage }) => {
  const me = useMe()
  const messageWrapperStyle = classNames(style.messageWrapper, {
    [style.nextMessage]:
      nextMessage && nextMessage.sender.id === message.sender.id
  })
  const messageContainerStyle = classNames(style.messageContainer, {
    [style.lastMessage]: !nextMessage
  })
  const renderOptions = message => {
    return (
      <div className={style.options}>
        {me.id === message.sender.id ? (
          <MoreVert className={style.verticalIcon} />
        ) : null}
      </div>
    )
  }

  if (previousMessage && message.sender.id === previousMessage.sender.id) {
    return (
      <React.Fragment>
        <div className={messageContainerStyle}>
          <div className={style.message}>
            <div className={style.messageText}>{message.message}</div>
            {renderOptions(message)}
          </div>
        </div>
        {nextMessage && nextMessage.sender.id !== message.sender.id ? (
          <hr
            className={[style.divider, style.enabled, style.second].join(' ')}
          />
        ) : null}
      </React.Fragment>
    )
  }

  return (
    <div className={messageWrapperStyle} key={message.id}>
      <div className={style.messageContainer}>
        <div className={style.messageHeaderWrapper}>
          <div className={style.userAvatarContainer}>
            <Avatar img={message.sender.avatar} preview={undefined} />
          </div>
          <div className={style.messageHeader}>
            <span className={style.name}>{message.sender.name}</span>
            <time className={style.time}>
              {moment(message.createdAt).calendar()}
            </time>
          </div>
        </div>

        <div className={style.messageContainer}>
          <div className={style.message}>
            <div className={style.messageText}>{message.message}</div>
            {renderOptions(message)}
          </div>
        </div>
      </div>

      {nextMessage && nextMessage.sender.id === message.sender.id ? null : (
        <hr className={[style.divider, style.enabled].join(' ')} />
      )}
    </div>
  )
}

export default MessageContent
