import React, { useEffect } from 'react'
import style from './ErrorScreen.module.css'
import FeelsBadMan from '../../assets/feelsbadman.png'
import history from '../../config/history';

const ErrorScreen = ({ error }) => {
  useEffect(() => {
    setTimeout(() => history.push('/'), 5000)
  }, [])

  return (
    <div className={style.errorScreen}>
      <span>Something went wrong! :(</span>
      <img src={FeelsBadMan} className={style.errorPicture} />
      <div>
        {error.graphQLErrors.length ? error.graphQLErrors[0].message : error.message}
      </div>
    </div>
  )
}

export default ErrorScreen