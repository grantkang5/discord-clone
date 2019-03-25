import { gql } from 'apollo-boost'
import * as fragments from '../../fragments'

export default gql`
  query Server($serverId: ID!) {
    server(serverId: $serverId) {
      ...Server
      users {
        ...User
      }
      channels {
        ...Channel
      }
    }
  }
  ${fragments.server}
  ${fragments.user}
  ${fragments.channel}
`
