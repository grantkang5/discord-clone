import { gql } from 'apollo-boost'
import * as fragments from '../../fragments'

export default gql`
  mutation JoinServer($serverId: ID!, $userId: ID!) {
    joinServer(serverId: $serverId, userId: $userId) {
      ...Server
      users {
        id
        email
        name
      }
    }
  }
  ${fragments.server}
`