import { gql } from 'apollo-boost'
import * as fragments from '../../fragments'

export default gql`
  {
    users {
      ...User
    }
  }
  ${fragments.user}
`
