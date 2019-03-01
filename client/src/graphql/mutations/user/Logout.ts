import { gql } from 'apollo-boost'

export default gql`
  mutation {
    logOut {
      id
      email
    }
  }
`