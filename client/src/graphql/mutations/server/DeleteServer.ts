import { gql } from 'apollo-boost'
import * as fragments from '../../fragments'

export default gql`
  mutation DeleteServer($serverId: ID!) {
    deleteServer(serverId: $serverId) {
      ...Server
    }
  }
  ${fragments.server}
`
