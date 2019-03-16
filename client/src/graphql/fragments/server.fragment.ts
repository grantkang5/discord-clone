import { gql } from 'apollo-boost'

export default gql`
  fragment Server on Server {
    id
    host {
      id
      email
      name
    }
    name
  }
`