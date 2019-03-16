import { gql } from 'apollo-boost'
import * as fragments from '../../fragments'

export default gql`
  query GetUsersByName($name: String!) {
    usersByName(name: $name) {
      ...User
    }
  }
  ${fragments.user}
`
