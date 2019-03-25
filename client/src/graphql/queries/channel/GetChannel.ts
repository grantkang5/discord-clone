import { gql } from 'apollo-boost'
import * as fragments from '../../fragments'

export default gql `
  query Channel($channelId: ID!) {
    channel(channelId: $channelId) {
      ...Channel
    }
  }
  ${fragments.channel}
`