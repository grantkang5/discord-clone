import React, { useState } from 'react'
import Dialog from '@material-ui/core/Dialog'
import Slide from '@material-ui/core/Slide'
import ExitToApp from '@material-ui/icons/ExitToApp'
import SettingsNavigation from './SettingsNavigation'
import SettingsContent from './SettingsContent'
import IconButton from '@material-ui/core/IconButton'
import style from './UserSettings.module.css'

const Transition = props => <Slide direction="right" {...props} />

const UserSettings = ({ open, handleClose }) => {
  const [activeSetting, handleSetting] = useState('account')
  const settings = [
    { id: 'account', label: 'My Account', category: 'User Settings' },
    { id: 'notifications', label: 'Notifications', category: 'App Settings' },
    { id: 'appearance', label: 'Appearance', category: 'App Settings' }
  ]
  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <div className={style.sideBarView}>
        <SettingsNavigation
          items={settings}
          handleSetting={handleSetting}
          selected={activeSetting}
          handleClose={handleClose}
        />
        <SettingsContent activeSetting={activeSetting} />
        <div className={style.exitWrapper}>
          <IconButton onClick={handleClose} aria-label="Close" color="inherit">
            <ExitToApp />
          </IconButton>

          <span>ESC</span>
        </div>
      </div>
    </Dialog>
  )
}

export default UserSettings
