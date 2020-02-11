import { EntityRepository, Repository } from 'typeorm'
import { Invitation } from '../../entity/Invitation'
import { User } from '../../entity/User'
import { Server } from '../../entity/Server'

interface InvitationArgs {
  userId: number
}

interface PostInvitationArgs {
  senderId: number
  receiverId: number
  serverId: number
}

@EntityRepository(Invitation)
class InvitationRepository extends Repository<Invitation> {
  async getSentInvitations({ userId }: InvitationArgs) {
    return await this.find({ sender: { id: userId } })
  }

  async getReceivedInvitations({ userId }: InvitationArgs) {
    return await this.find({ receiver: { id: userId } })
  }

  async sendInvitation({ senderId, receiverId, serverId }: PostInvitationArgs) {
    if (receiverId === senderId) {
      throw new Error('Cannot send invites to yourself')
    }

    const receiver = await User.findOne({ id: receiverId })
    const sender = await User.findOne({ id: senderId })
    const server = await Server.findOne({ id: serverId })

    if (!receiver || !sender || !server) throw new Error('Data could not be found')

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

  async deleteInvitation({ invitationId }: { invitationId: number }) {
    try {
      const invitationToDelete = await this.findOne({ id: invitationId })
      if (!invitationToDelete) throw new Error('Invitation could not be found')
      invitationToDelete.remove()
      return invitationToDelete
    } catch (error) {
      throw new Error(error)
    }
  }
}

export default InvitationRepository
