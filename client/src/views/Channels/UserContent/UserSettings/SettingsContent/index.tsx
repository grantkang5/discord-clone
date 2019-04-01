import React from 'react'
import { useMe } from '../../../../../services/auth.service'
import MyAccount from './MyAccount'
import style from './SettingsContent.module.css'
import { useMutation } from 'react-apollo-hooks';
import { CURRENT_USER } from '../../../../../graphql/queries';

const SettingsContent = ({ activeSetting }) => {
  const renderSwitch = () => {
    switch (activeSetting) {
      case 'account':
        return <MyAccount />
      default:
        return (
          <div style={{ color: '#FFF' }}>
            This page is currently being worked on!
          </div>
        )
    }
  }

  return <div className={style.contentWrapper}>
    <div className={style.viewContent}>
      {renderSwitch()}
    </div>
  </div>
}

export default SettingsContent
