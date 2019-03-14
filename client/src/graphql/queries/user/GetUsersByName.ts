import { gql } from 'apollo-boost'

export default gql`
  query GetUsersByName($name: String!) {
    usersByName(name: $name) {
      id
      email
      name
    }
  }
`
