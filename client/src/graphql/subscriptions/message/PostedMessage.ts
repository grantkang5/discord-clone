import { gql } from 'apollo-boost'
import * as fragments from '../../fragments'

export default gql`
  subscription {
    postedMessage {
      ...Message
      channel {
        id
        name
      }
      sender {
        id
        name
      }
    }
  }
  ${fragments.message}
`
