import { gql } from 'apollo-boost'

export default gql`
  mutation logIn($email: String!, $password: String!) {
    logIn(email: $email, password: $password) {
      id
      email
    }
  }
`