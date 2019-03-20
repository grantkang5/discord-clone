import { gql } from 'apollo-boost'
import * as fragments from '../../fragments'

export default gql`
  mutation DeleteChannel($channelId: ID!) {
    deleteChannel(channelId: $channelId) {
      ...Channel
      server {
        id
        name
      }
    }
  }
  ${fragments.channel}
`
