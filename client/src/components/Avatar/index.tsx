import React from 'react'
import style from './Avatar.module.css'
import { colorHash } from '../../services/hash.service'
import { useMe } from '../../services/auth.service'

interface Props {
  img?: Object | string
  preview?: Object | string
}

const Avatar = ({ img, preview }) => {
  const me = useMe()
  const CLIENT_URL =
    process.env.NODE_ENV === 'production'
      ? 'https://discordapp-clone.com'
      : 'http://localhost:3050'
  if (preview) {
    return (
      <div className={style.avatarWrapper}>
        <img src={preview.preview} className={style.avatar} />
      </div>
    )
  }

  if (!img) {
    return (
      <div
        className="defaultAvatar"
        style={{ backgroundColor: colorHash.hex(me.id) }}
      />
    )
  }

  return (
    <React.Fragment>
      <div className={style.avatarWrapper}>
        <img src={`${CLIENT_URL}/api/images/${img}`} className={style.avatar} />
      </div>
    </React.Fragment>
  )
}

export default Avatar
