import { gql } from 'apollo-boost'

export default gql`
  query UserServers($userId: ID!) {
    userServers(userId: $userId) {
      id
      name
      host {
        id
        email
      }
    }
  }
`
