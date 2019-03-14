import { IResolvers } from "graphql-tools";
import { getCustomRepository } from 'typeorm';
import { InvitationRepository } from ".";
import { INVITATION_SENT, pubsub } from "../subscriptions";

const resolvers: IResolvers = {
  Query: {
    getSentInvitations: async (_, { userId }) => {
      return await getCustomRepository(InvitationRepository).getSentInvitations({ userId })
    },
    getReceivedInvitations: async (_, { userId }) => {
      return await getCustomRepository(InvitationRepository).getReceivedInvitations({ userId })
    }
  },

  Mutation: {
    sendInvitation: async (_, { senderId, receiverId, serverId }) => {
      const sentInvitation = await getCustomRepository(InvitationRepository).sendInvitation({ senderId, receiverId, serverId })
      pubsub.publish(INVITATION_SENT, { sentInvitation })
      return sentInvitation
    },
    deleteInvitation: async (_, { invitationId }) => {
      return await getCustomRepository(InvitationRepository).deleteInvitation({ invitationId })
    }
  },

  Subscription: {
    sentInvitation: {
      subscribe: () => pubsub.asyncIterator([INVITATION_SENT])
    }
  }
}

export default resolvers