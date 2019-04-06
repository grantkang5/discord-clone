import { gql } from 'apollo-boost'

export default gql`
  mutation EditUser(
    $userId: ID!
    $name: String
    $email: String
    $currentPassword: String
    $newPassword: String
    $avatar: Upload
  ) {
    editUser(
      userId: $userId
      name: $name
      email: $email
      currentPassword: $currentPassword
      newPassword: $newPassword
      avatar: $avatar
    ) {
      id
      name
      email
      avatar
    }
  }
`
