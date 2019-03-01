import React from 'react'
import style from '../ServerContent.module.css'

const HomeHeader = () => {
  return (
    <div className={style.headerWrapper}>
      <header className={style.header}>
        <span>Home</span>
      </header>
    </div>
  )
}

export default HomeHeader