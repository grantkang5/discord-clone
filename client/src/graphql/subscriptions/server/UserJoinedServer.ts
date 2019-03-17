import { gql } from 'apollo-boost'
import * as fragments from '../../fragments'

export default gql`
  subscription {
    userJoinedServer {
      ...Server
      users {
        id
        email
        name
      }
    }
  }
  ${fragments.server}
`
