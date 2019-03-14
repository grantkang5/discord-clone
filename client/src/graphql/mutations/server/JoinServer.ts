import { gql } from 'apollo-boost'

export default gql`
  mutation JoinServer($serverId: ID!, $userId: ID!) {
    joinServer(serverId: $serverId, userId: $userId) {
      id
      name
      users {
        id
        email
        name
      }
    }
  }
`