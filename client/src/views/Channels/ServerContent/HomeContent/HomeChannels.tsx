import React from 'react'
import style from '../ServerContent.module.css'

const HomeChannels = () => {
  return (
    <div className={style.channelsWrapper}>
      <div className={style.channelsScroller}>
        <div className={style.channelContainer}>
          <span>Text Channels</span>
        </div>

        <div className={style.channelContainer}>
          <span>Voice channels</span>
        </div>
      </div>
    </div>
  )
}

export default HomeChannels