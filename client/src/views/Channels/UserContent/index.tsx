import React, { useState } from 'react'
import style from './UserContent.module.css'
import { useMe } from '../../../services/auth.service'
import SettingsIcon from '@material-ui/icons/Settings'
import UserSettings from './UserSettings'

// TODO - Replace MUI tooltips

const UserContent = () => {
  const [open, handleDialog] = useState(false)
  const handleOpen = () => handleDialog(true)
  const handleClose = () => handleDialog(false)

  const me = useMe()
  return (
    <div className={style.userWrapper}>
      <div className={style.user}>
        <div className={style.name}>{me.name}</div>

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
    </div>
  )
}

export default UserContent
