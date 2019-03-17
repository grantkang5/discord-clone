import { gql } from 'apollo-boost'
import * as fragments from '../../fragments'

export default gql`
  mutation DeleteInvitation($invitationId: ID!) {
    deleteInvitation(invitationId: $invitationId) {
      ...Invitation
    }
  }
  ${fragments.invitation}
`