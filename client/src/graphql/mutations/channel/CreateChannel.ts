import { gql } from 'apollo-boost'
import * as fragments from '../../fragments'

export default gql`
  mutation CreateChannel($name: String!, $serverId: ID!, $type: String!) {
    createChannel(name: $name, serverId: $serverId, type: $type) {
      ...Channel
      server {
        id
        name
      }
    }
  }
  ${fragments.channel}
`
