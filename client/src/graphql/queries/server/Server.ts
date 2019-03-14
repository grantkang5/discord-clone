import { gql } from 'apollo-boost'

export default gql`
  query Server($serverId: ID!) {
    server(serverId: $serverId) {
      id
      name
      host {
        id
        email
        name
      }
      users {
        id
        email
        name
      }
    }
  }
`
