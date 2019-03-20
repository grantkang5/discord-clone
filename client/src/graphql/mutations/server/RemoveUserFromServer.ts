import { gql } from 'apollo-boost'
import * as fragments from '../../fragments'

export default gql`
  mutation RemoveUserFromServer($serverId: ID!, $userId: ID!) {
    removeUserFromServer(serverId: $serverId, userId: $userId) {
      ...User
    }
  }
  ${fragments.user}
`