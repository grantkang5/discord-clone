import { gql } from 'apollo-boost'
import * as fragments from '../../fragments'

export default gql`
  subscription {
    removedUser {
      server {
        ...Server
        users {
          ...User
        }
      }
      user {
        ...User
      }
    }
  }
  ${fragments.server}
  ${fragments.user}
`
