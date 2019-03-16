import { EntityRepository, Repository } from 'typeorm'
import { Invitation } from '../../entity/Invitation'
import { User } from '../../entity/User'
import { Server } from '../../entity/Server'

@EntityRepository(Invitation)
class InvitationRepository extends Repository<Invitation> {
  async getSentInvitations({ userId }) {
    return await this.find({ sender: { id: userId } })
  }

  async getReceivedInvitations({ userId }) {
    return await this.find({ receiver: { id: userId } })
  }

  async sendInvitation({ senderId, receiverId, serverId }) {
    if (receiverId === senderId) {
      throw new Error('Cannot send invites to yourself')
    }

    const receiver = await User.findOne({ id: receiverId })
    const sender = await User.findOne({ id: senderId })
    const server = await Server.findOne({ id: serverId })

    const existingInvitation = await this.findOne({
      server: {
        id: server.id
      },
      sender: {
        id: senderId
      },
      receiver: {
        id: receiverId
      }
    })

    if (existingInvitation) {
      throw new Error("You've already sent this invitation")
    }

    return await this.create({
      server,
      sender,
      receiver
    }).save()
  }

  async deleteInvitation({ invitationId }) {
    try {
      const invitationToDelete = await this.findOne({ id: invitationId })
      invitationToDelete.remove()
      return invitationToDelete
    } catch (error) {
      throw new Error(error)
    }
  }
}

export default InvitationRepository
