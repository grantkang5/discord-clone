import React from 'react'
import ServerChannels from './ServerChannels';
import ServerHeader from './ServerHeader';
import { useQuery } from 'react-apollo-hooks';
import { GET_SERVER } from '../../../../graphql/queries';

// TODO - Add prefetching on server lists to avoid flashing on joining uncached servers
const ServerContent = ({ match }) => {
  const { data } = useQuery(GET_SERVER, {
    variables: { serverId: match.params.serverId },
    suspend: true
  })

  return (
    <React.Fragment>
      <ServerHeader server={data.server} />
      <ServerChannels />
    </React.Fragment>
  )
}

export default ServerContent