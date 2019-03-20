import { gql } from 'apollo-boost'

export default gql`
  fragment Channel on Channel {
    id
    name
    type
  }
`