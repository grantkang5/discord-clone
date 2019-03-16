import React from 'react'
import ServerChannels from './ServerChannels';
import ServerHeader from './ServerHeader';
import { useQuery } from 'react-apollo-hooks';
import { GET_SERVER } from '../../../../graphql/queries';
import ErrorScreen from '../../../../components/ErrorScreen';

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
      <ServerHeader server={data.server} />
      <ServerChannels />
    </React.Fragment>
  )
}

export default ServerContent