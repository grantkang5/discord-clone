import React from 'react'
import style from './ServerList.module.css'
import classNames from 'classnames'
import history from '../../../config/history'
import { useApolloClient } from 'react-apollo-hooks'
import { GET_SERVER } from '../../../graphql/queries'

interface Props {
  id: number
  name: string
  active?: boolean
}

const ServerIcon = ({ id, name, active }) => {
  const client = useApolloClient()
  const handleServerChange = () => {
    if (active) return null
    history.push(`/channels/${id}`)
  }
  const serverIconWrapperStyle = classNames(style.serverIconWrapper, {
    [style.active]: active
  })
  const serverIconStyle = classNames(style.serverIcon, {
    [style.active]: active
  })

  return (
    <div
      className={serverIconWrapperStyle}
      onClick={() => handleServerChange()}
      onMouseOver={() => {
        client.query({ query: GET_SERVER, variables: { serverId: id } })
      }}
    >
      <div className={serverIconStyle}>
        <a className={style.serverIconLink}>{name[0].toUpperCase()}</a>
      </div>
    </div>
  )
}

export default ServerIcon
