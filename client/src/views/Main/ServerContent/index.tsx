import React from 'react'
import style from './ServerContent.module.css'
import Channels from './Channels'

const ServerContent = () => {
  return (
    <div className={style.serverContent}>
      <div className={style.headerWrapper}>
        <header className={style.header}>
          <span>Server Example</span>
        </header>
      </div>

      <Channels />
    </div>
  )
}

export default ServerContent