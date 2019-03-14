import { gql } from 'apollo-server-express'

export default gql`
  scalar Date

  type Invitation {
    id: ID
    server: Server
    createdAt: Date 
    sender: User
    receiver: User
  }

  extend type Query {
    getSentInvitations(userId: ID!): [Invitation]
    getReceivedInvitations(userId: ID!): [Invitation]
  }

  extend type Mutation {
    sendInvitation(senderId: ID!, receiverId: ID!, serverId: ID!): Invitation
    deleteInvitation(invitationId: ID!): Invitation
  }

  extend type Subscription {
    sentInvitation: Invitation
  }
`