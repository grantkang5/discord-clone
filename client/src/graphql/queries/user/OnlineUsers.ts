import { gql } from 'apollo-boost'
import * as fragments from '../../fragments'

export default gql`
  query OnlineUsers($serverId: ID!) {
    onlineUsers(serverId: $serverId) {
      ...User
    }
  }
  ${fragments.user}
`
