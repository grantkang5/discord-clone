import { gql } from 'apollo-boost'

export default gql`
  fragment Message on Message {
    id
    message
    createdAt
  }
`