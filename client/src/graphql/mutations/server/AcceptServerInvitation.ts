import { gql } from 'apollo-boost'
import * as fragments from '../../fragments'

export default gql`
  mutation AcceptServerInvitation($invitationId: ID!) {
    acceptServerInvitation(invitationId: $invitationId) {
      ...Server
      users {
        id
        name
        email
      }
    }
  }
  ${fragments.server}
`