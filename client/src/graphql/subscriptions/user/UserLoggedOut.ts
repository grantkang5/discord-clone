import { gql } from 'apollo-boost'
import * as fragments from '../../fragments'

export default gql`
  subscription {
    userLoggedOut {
      ...User
    }
  }
  ${fragments.user}
`