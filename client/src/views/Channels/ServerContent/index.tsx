import React, { useEffect } from 'react'
import { Route } from 'react-router-dom'
import ServerChannels from './ServerChannels'
import ServerHeader from './ServerHeader'
import { useQuery } from 'react-apollo-hooks'
import { GET_SERVER } from '../../../graphql/queries'
import ErrorScreen from '../../../components/ErrorScreen'
import style from './ServerContent.module.css'
import UserContent from '../UserContent'
import ServerChat from '../ServerChat'
import { getPaths } from '../../../services/hash.service'
import history from '../../../config/history'
import { groupBy } from 'lodash'

const ServerContent = ({ match, location }) => {
  const { channelPath } = getPaths(location)
  const { data, error } = useQuery(GET_SERVER, {
    variables: { serverId: match.params.serverId },
    suspend: true
  })
  if (error) {
    return <ErrorScreen error={error} />
  }
  const channels = groupBy(data.server.channels, channels => channels.type)
  
  useEffect(() => {
    if (!channelPath && data) {
      history.push(`/channels/${data.server.id}/${channels.text[0].id}`)
    }
  }, [data])


  if (!channelPath) {
    return null
  }

  return (
    <React.Fragment>
      <div className={style.channelsBox}>
        <ServerHeader server={data.server} />
        <ServerChannels server={data.server} />
        <UserContent />
      </div>

      <Route
        path="/channels/:serverId/:channelId"
        render={props => <ServerChat server={data.server} {...props} />}
      />
    </React.Fragment>
  )
}

export default ServerContent
