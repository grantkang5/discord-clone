import { gql } from 'apollo-boost'
import * as fragments from '../../fragments'

export default gql`
  mutation CreateServer($name: String!, $userId: ID!) {
    createServer(name: $name, userId: $userId) {
      ...Server
    }
  }
  ${fragments.server}
`
