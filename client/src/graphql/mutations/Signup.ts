import { gql } from 'apollo-boost';

export default gql`
  mutation Signup($email: String!, $password: String!) {
    signUp(email: $email, password: $password) {
      id
      email
    }
  }
`