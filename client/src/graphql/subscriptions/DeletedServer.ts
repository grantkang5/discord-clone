import { gql } from 'apollo-boost'

export default gql`
  subscription {
    deletedServer {
      id
      name
      host {
        id
        email
      }
    }
  }
`
