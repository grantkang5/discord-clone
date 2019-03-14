import { gql } from 'apollo-boost'

export default gql`
  subscription {
    userLoggedOut {
      id
      email
    }
  }
`