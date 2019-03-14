import { gql } from 'apollo-boost'

export default gql`
  mutation sendInvitation($senderId: ID!, $receiverId: ID!, $serverId: ID!) {
    sendInvitation(
      senderId: $senderId
      receiverId: $receiverId
      serverId: $serverId
    ) {
      id
      server {
        id
      }
      sender {
        id
        email
      }
      receiver {
        id
        email
      }
      createdAt
    }
  }
`
