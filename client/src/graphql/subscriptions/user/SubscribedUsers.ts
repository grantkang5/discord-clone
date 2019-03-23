import { gql } from 'apollo-boost'

export default gql`
  subscription {
    users {
      id
      email
    }
  }
`