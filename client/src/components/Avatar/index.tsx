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
        <img src={`${process.env.REACT_APP_CLIENT_URL}/${img}`} className={style.avatar} />
      </div>
    </React.Fragment>
  )
}

export default Avatar
