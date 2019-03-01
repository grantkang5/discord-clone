import { gql } from 'apollo-boost'

export default gql`
  {
    me {
      id
      email
    }
  }
`