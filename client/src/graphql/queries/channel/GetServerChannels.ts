import { gql } from 'apollo-boost'

export default gql`
  query GetServerChannels($serverId: ID!) {
    getServerChannels(serverId: $serverId) {
      id
      name
      type
    }
  }
`
