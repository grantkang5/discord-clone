import { gql } from 'apollo-boost'

export default gql`
  fragment Invitation on Invitation {
    id
    server {
      id
      name
    }
    sender {
      id
      email
      name
    }
    receiver {
      id
      email
      name
    }
    createdAt
  }
`
