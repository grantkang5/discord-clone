import { gql } from 'apollo-boost'
import * as fragments from '../../fragments'

export default gql`
  {
    me {
      ...User
    }
  }
  ${fragments.user}
`