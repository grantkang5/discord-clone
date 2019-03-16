import { gql } from 'apollo-boost'
import * as fragments from '../../fragments'

export default gql`
  mutation sendInvitation($senderId: ID!, $receiverId: ID!, $serverId: ID!) {
    sendInvitation(
      senderId: $senderId
      receiverId: $receiverId
      serverId: $serverId
    ) {
      ...Invitation
    }
  }
  ${fragments.invitation}
`
