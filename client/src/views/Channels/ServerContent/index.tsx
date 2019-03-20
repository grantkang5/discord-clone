import React from 'react'
import { Route } from 'react-router-dom'
import ServerChannels from './ServerChannels'
import ServerHeader from './ServerHeader'
import { useQuery } from 'react-apollo-hooks'
import { GET_SERVER } from '../../../graphql/queries'
import ErrorScreen from '../../../components/ErrorScreen'
import style from './ServerContent.module.css'
import UserContent from '../UserContent'
import ServerChat from '../ServerChat'

// TODO - Add prefetching on server lists to avoid flashing on joining uncached servers
const ServerContent = ({ match }) => {
  const { data, error } = useQuery(GET_SERVER, {
    variables: { serverId: match.params.serverId },
    suspend: true
  })

  if (error) {
    return <ErrorScreen error={error} />
  }

  return (
    <React.Fragment>
      <div className={style.channelsBox}>
        <ServerHeader server={data.server} />
        <ServerChannels server={data.server} />
        <UserContent />
      </div>

      <ServerChat server={data.server} />
    </React.Fragment>
  )
}

export default ServerContent
