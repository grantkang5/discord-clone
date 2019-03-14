import { gql } from 'apollo-boost'

export default gql`
  subscription {
    sentInvitation {
      id
      server {
        id
        name
      }
      createdAt
      sender {
        id
        email
      }
      receiver {
        id
        email
      }
    }
  }
`
