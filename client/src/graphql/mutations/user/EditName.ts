import { gql } from 'apollo-boost'

export default gql`
  mutation EditName($userId:ID!, $name:String!) {
    editName(userId:$userId, name:$name) {
      id
      name
    }
  }
`