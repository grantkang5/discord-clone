import { gql } from 'apollo-boost'
import * as fragments from '../../fragments'

export default gql`
  query GetMessages($channelId: ID!, $cursor: String) {
    getMessages(channelId: $channelId, cursor: $cursor) {
      ...Message
      channel {
        ...Channel
      }
      sender {
        ...User
      }
    }
  }
  ${fragments.message}
  ${fragments.channel}
  ${fragments.user}
`
