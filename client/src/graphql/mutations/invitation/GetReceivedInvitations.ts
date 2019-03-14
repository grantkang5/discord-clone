import { gql } from 'apollo-boost'

export default gql`
  query GetReceivedInvitations($userId: ID!) {
    getReceivedInvitations(userId: $userId) {
      id
      server {
        id
        name
      }
      createdAt
      sender {
        id
        email
        name
      }
    }
  }
`
