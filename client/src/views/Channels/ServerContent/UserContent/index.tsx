import React, { useState } from 'react'
import style from './UserContent.module.css'
import { useMe } from '../../../../services/requireAuth'
import Settings from '@material-ui/icons/Settings'
import Tooltip from '@material-ui/core/Tooltip'
import UserSettings from './UserSettings'

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
          <Tooltip title="User Settings">
            <div className={style.buttonContainer} onClick={handleOpen}>
              <Settings className={style.button} />
            </div>
          </Tooltip>
          <UserSettings open={open} handleClose={handleClose} />
        </div>
      </div>
    </div>
  )
}

export default UserContent

// TODO - Style tooltip w/ arrow + #000
