import React from 'react'
import style from './ServerList.module.css'
import classNames from 'classnames'

interface Props {
  name: string
  active?: boolean
}

const ServerIcon = ({ name, active }) => {
  const serverIconWrapperStyle = classNames(style.serverIconWrapper, {
    [style.active]: active
  })

  const serverIconStyle = classNames(style.serverIcon, {
    [style.active]: active
  })
  
  return (
    <div className={serverIconWrapperStyle}>
      <div className={serverIconStyle}>
        <a className={style.serverIconLink}>
          {name[0].toUpperCase()}
        </a>
      </div>
    </div>
  )
}

export default ServerIcon