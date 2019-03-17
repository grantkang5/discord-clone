import { gql } from 'apollo-boost'
import * as fragments from '../../fragments'

export default gql`
  subscription {
    sentInvitation {
      ...Invitation
    }
  }
  ${fragments.invitation}
`
