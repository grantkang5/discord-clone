import { gql } from 'apollo-boost'

export default gql`
  mutation DeleteServer($serverId: ID!) {
    deleteServer(serverId: $serverId) {
      id
      name
      host {
        id
        email
      }
    }
  }
`
