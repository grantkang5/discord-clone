import React from 'react'
import style from './ServerContent.module.css'
import ChannelWrapper from '../../../../components/ChannelWrapper'

const ServerChannels = () => {
  return (
    <ChannelWrapper>
      <div className={style.channelContainer}>
        <span>Text Channels</span>
      </div>

      <div className={style.channelContainer}>
        <span>Voice channels</span>
      </div>
    </ChannelWrapper>
  )
}

export default ServerChannels
