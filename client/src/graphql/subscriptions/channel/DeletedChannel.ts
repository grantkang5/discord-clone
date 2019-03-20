import { gql } from 'apollo-boost'
import * as fragments from '../../fragments'

export default gql`
  subscription {
    deletedChannel {
      ...Channel
      server {
        id
        name
        users {
          id
          email
        }
      }
    }
  }
  ${fragments.channel}
`
