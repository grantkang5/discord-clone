import React from 'react'
import { useQuery } from 'react-apollo-hooks'
import { GET_MESSAGES } from '../../../../../graphql/queries/message'
import style from './Messages.module.css'
import { useMe } from '../../../../../services/requireAuth';
import MoreVert from '@material-ui/icons/MoreVert'

const Messages = ({ channel }) => {
  const me = useMe()
  const { data } = useQuery(GET_MESSAGES, {
    variables: { channelId: channel.id },
    suspend: true
  })

  const renderOptions = (message) => {
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
      {data.getMessages.map(message => {
        return (
          <div className={style.messageWrapper} key={message.id}>
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
                  <div className={style.messageText}>
                    {message.message}
                  </div>
                  {renderOptions(message)}
                </div>
              </div>
            </div>

            <hr className={[style.divider, style.enabled].join(' ')} />
          </div>
        )
      })}
    </React.Fragment>
  )
}

export default Messages
