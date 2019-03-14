import { gql } from 'apollo-boost'

export default gql`
  mutation AcceptServerInvitation($invitationId: ID!) {
    acceptServerInvitation(invitationId: $invitationId) {
      id
      name
      users {
        id
        name
        email
      }
    }
  }
`