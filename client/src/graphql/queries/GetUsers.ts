import { gql } from 'apollo-boost'

export default gql`
  {
    users {
      id
      email
    }
  }
`
