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
import getPaths from '../../../services/getPaths'
import history from '../../../config/history';
import { groupBy } from 'lodash'

// TODO - Add prefetching on server lists to avoid flashing on joining uncached servers
const ServerContent = ({ match, location }) => {
  const { channelPath } = getPaths(location)
  const { data, error } = useQuery(GET_SERVER, {
    variables: { serverId: match.params.serverId },
    suspend: true
  })
  const channels = groupBy(data.server.channels, channels => channels.type)
  
  useEffect(() => {
    if (!channelPath && data) {
      history.push(`/channels/${data.server.id}/${channels.text[0].id}`)
    }
  }, [data])
  
  if (error) {
    return <ErrorScreen error={error} />
  }

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
