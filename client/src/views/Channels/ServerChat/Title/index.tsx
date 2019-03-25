import React from 'react'
import style from './Title.module.css'

const Title = ({ channel }) => {
  return (
    <div className={style.titleWrapper}>
      <div className={style.titleContainer}>
        <div className={style.title}>
          # {channel.name}
        </div>

        <div className={style.options}>

        </div>
      </div>
    </div>
  )
}

export default Title