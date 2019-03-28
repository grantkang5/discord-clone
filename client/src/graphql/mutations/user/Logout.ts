import { gql } from 'apollo-boost'

export default gql`
  mutation LogOut {
    logOut {
      id
    }
  }
`