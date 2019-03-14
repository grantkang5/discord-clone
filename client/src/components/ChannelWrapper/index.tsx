import React from 'react'
import style from './ChannelWrapper.module.css'

const ChannelWrapper = ({ children }) => (
  <div className={style.channelsWrapper}>
    <div className={style.channelsScroller}>
      {children}
    </div>
  </div>
)

export default ChannelWrapper