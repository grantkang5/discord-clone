import React from 'react'
import style from './Avatar.module.css'
import { colorHash } from '../../services/hash.service'
import { useMe } from '../../services/auth.service'

const Avatar = ({ img }) => {
  const me = useMe()
  const handleImage = () => {
    console.log('Avatar props IMG: ', img)

    if (img.path) {
      console.log(img.path)
      return img.path
    } else if (img) {
      return img
    } else {
      return ''
    }
  }

  return (
    <React.Fragment>
      {img ? (
        <div className={style.avatarWrapper}>
          <img src={handleImage()} className={style.avatar} />
        </div>
      ) : (
        <div
          className="defaultAvatar"
          style={{ backgroundColor: colorHash.hex(me.id) }}
        />
      )}
    </React.Fragment>
  )
}

export default Avatar
