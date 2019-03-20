import { gql } from 'apollo-boost'
import * as fragments from '../../fragments'

export default gql`
  mutation ChangeChannel($channelId: ID!, $name: String!) {
    changeChannel(channelId: $channelId, name: $name) {
      ...Channel
      server {
        id
        name
      }
    }
  }
  ${fragments.channel}
`
