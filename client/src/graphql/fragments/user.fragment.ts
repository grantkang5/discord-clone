import { gql } from 'apollo-boost'

export default gql`
  fragment User on User {
    id
    email
    name
    avatar
  }
`