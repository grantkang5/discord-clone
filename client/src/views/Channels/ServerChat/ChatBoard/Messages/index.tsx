import React, { useEffect, useRef, useLayoutEffect, useState } from 'react'
import { useQuery } from 'react-apollo-hooks'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import style from './Messages.module.css'
import { useMe } from '../../../../../services/auth.service'
import MoreVert from '@material-ui/icons/MoreVert'
import { message } from '../../../../../graphql/fragments'
import { GET_MESSAGES } from '../../../../../graphql/queries'
import { Message, Channel } from '../../../../../graphql/types'
import MessageSnackbar from './MessageSnackbar'
import moment from 'moment'
import MessageContent from './MessageContent'
import { Loader } from '../../../../../components/Loaders/Loading'
import CircularProgress from '@material-ui/core/CircularProgress'
import { withStyles } from '@material-ui/core/styles'

type Params = {
  channelId: string
  serverId: string
}

type Props = RouteComponentProps<Params> & {
  channel: Channel
  messages: [Message]
  fetchMore: Function
}

const Messages = ({ channel, messages, location, fetchMore }: Props) => {
  const me = useMe()
  const [jump, handleJump] = useState(false)
  const [fetchingMore, handleFetchMore] = useState(false)
  const [moreMessages, handleMoreMessages] = useState(true)
  const [previousHeight, handlePreviousHeight] = useState(null)
  const messageContainer = useRef(null)
  const messagesEnd = useRef(null)
  const reversedMessages = messages ? messages.slice().reverse() : []

  useEffect(() => {
    // Scroll to bottom on mount
    messageContainer.current.scrollTop = messageContainer.current.scrollHeight
    handlePreviousHeight(messageContainer.current.scrollHeight)
  }, [])
  useEffect(() => {
    // Scroll to bottom on route change
    messageContainer.current.scrollTop = messageContainer.current.scrollHeight
    handlePreviousHeight(messageContainer.current.scrollHeight)
  }, [location.pathname])
  useEffect(() => {
    if (messages.length && !fetchingMore) {
      const count = messageContainer.current.childElementCount
      const newestMessage = messageContainer.current.childNodes[count - 2]
      handlePreviousHeight(messageContainer.current.scrollHeight)
      // If scrolled down to AT LEAST 90% of the list --> scroll to bottom
      if (
        messageContainer.current.scrollTop + newestMessage.scrollHeight >
        (messageContainer.current.scrollHeight -
          messageContainer.current.clientHeight) *
          0.9
      ) {
        messagesEnd.current.scrollIntoView({ behavior: 'smooth' })
      } else if (messages.length > 35) {
        handleJump(true)
      }
    }
  }, [messages])

  const handleScroll = () => {
    if (
      messageContainer &&
      messageContainer.current.scrollTop === 0 &&
      moreMessages &&
      messages.length >= 35
    ) {
      handleFetchMore(true)
      fetchMore({
        variables: {
          channelId: channel.id,
          cursor: messages[messages.length - 1].createdAt
        },
        updateQuery: (previousResult, { fetchMoreResult, ...otherProps }) => {
          if (!fetchMoreResult) return previousResult
          if (fetchMoreResult.getMessages.length < 35) {
            handleMoreMessages(false)
          }

          return {
            getMessages: [
              ...previousResult.getMessages,
              ...fetchMoreResult.getMessages
            ]
          }
        }
      }).then(({ data }) => {
        if (data.getMessages) {
          messageContainer.current.scrollTop =
            messageContainer.current.scrollHeight - previousHeight
        }

        if (data.getMessages.length < 35) {
          handleMoreMessages(false)
        }
        handleFetchMore(false)
      })
    }
  }

  return (
    <React.Fragment>
      <div
        className={style.scroller}
        ref={messageContainer}
        onScroll={handleScroll}
      >
        {fetchingMore && (
          <div className={style.spinnerWrapper}>
            <StyledSpinner />
          </div>
        )}
        {reversedMessages.map((message, index) => {
          const previousMessage =
            index - 1 > -1 ? reversedMessages[index - 1] : null
          const nextMessage =
            index + 1 < reversedMessages.length
              ? reversedMessages[index + 1]
              : null
          return (
            <MessageContent
              previousMessage={previousMessage}
              nextMessage={nextMessage}
              message={message}
              index={index}
              key={message.id}
            />
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

const StyledSpinner = withStyles({
  circle: {
    color: '#FFF'
  },
  root: {
    width: '28px !important',
    height: '28px !important'
  }
})(CircularProgress)

export default withRouter(Messages)
