import { gql } from 'apollo-boost'
import * as fragments from '../../fragments'

export default gql`
  query GetReceivedInvitations($userId: ID!) {
    getReceivedInvitations(userId: $userId) {
      ...Invitation
    }
  }
  ${fragments.invitation}
`
