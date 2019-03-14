import React from 'react'
import style from './ServerChat.module.css'
import Title from './Title';
import ChatBoard from './ChatBoard';
import Members from './Members';

const ServerChat = () => {
  return (
    <div className={style.chatContainer}>
      <Title/>
      <div className={style.chatContent}>
        <ChatBoard />
        <Members />
      </div>
    </div>
  )
}

export default ServerChat