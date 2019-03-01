import React from 'react'
import style from './ServerContent.module.css'
import { useMe } from '../../../services/requireAuth';
import Settings from '@material-ui/icons/Settings'
import Tooltip from '@material-ui/core/Tooltip'

const UserControls = () => {
  const me = useMe()
  return (
    <div className={style.userWrapper}>
      <div className={style.user}>
        <div className={style.name}>
          {me.name}
        </div>

        <div className={style.buttonsWrapper}>
          <Tooltip title="User Settings">
            <div className={style.buttonContainer} onClick={}>
              <Settings className={style.button} />
            </div>
          </Tooltip>
        </div>
      </div>
    </div>
  )
}

export default UserControls

// TODO - Style tooltip w/ arrow + #000