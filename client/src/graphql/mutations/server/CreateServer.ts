import { gql } from 'apollo-boost'

export default gql`
  mutation CreateServer($name: String!, $userId: ID!) {
    createServer(name: $name, userId: $userId) {
      id
      name
      host {
        id
        email
      }
    }
  }
`
