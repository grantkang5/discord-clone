import { gql } from 'apollo-boost'

export default gql`
  mutation Logout {
    logOut {
      id
    }
  }
`