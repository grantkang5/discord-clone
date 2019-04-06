import React, { useState } from 'react'
import style from './UserContent.module.css'
import { useMe } from '../../../services/auth.service'
import SettingsIcon from '@material-ui/icons/Settings'
import UserSettings from './UserSettings'
import { colorHash } from '../../../services/hash.service'
import Avatar from '../../../components/Avatar';

// TODO - Replace MUI tooltips

const UserContent = () => {
  const me = useMe()
  const [open, handleDialog] = useState(false)
  const handleOpen = () => handleDialog(true)
  const handleClose = () => handleDialog(false)

  return (
    <div className={style.userWrapper}>
      <div className={style.user}>
        <div className={style.avatarWrapper}>
          <Avatar img={me.avatar} preview={undefined} />
        </div>
        <div className={style.name}>{me.name}</div>
      </div>

      <div className={style.buttonsWrapper}>
        <div
          className={style.buttonContainer}
          onClick={handleOpen}
          aria-label="User Settings"
        >
          <SettingsIcon className={style.button} />
        </div>
        <UserSettings open={open} handleClose={handleClose} />
      </div>
    </div>
  )
}

export default UserContent
