import React from 'react'
import style from './Title.module.css'
import { useChannelState } from '../../../../services/ChannelsProvider';

const Title = () => {
  const { activeChannel } = useChannelState()
  return (
    <div className={style.titleWrapper}>
      <div className={style.titleContainer}>
        <div className={style.title}>
          # {activeChannel ? activeChannel.name : null}
        </div>

        <div className={style.options}>

        </div>
      </div>
    </div>
  )
}

export default Title