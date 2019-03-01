import { EntityRepository, Repository, In } from 'typeorm'
import { Invitation } from '../../entity/Invitation';
import { User } from '../../entity/User';
import { Server } from '../../entity/Server';


@EntityRepository(Invitation)
class InvitationRepository extends Repository<Invitation> {
  async getSentInvitations({ userId }) {
    return await this.find({ sender: { id: userId } })
  }

  async getReceivedInvitations({ userId }) {
    return await this.find({ recipients: { id: userId } })
  }

  async sendInvitation({ senderId, receivers, serverId }) {
    const recipients = await User.find({
      id: In([...receivers])
    })
    const sender = await User.findOne({ id: senderId })
    const server = await Server.findOne({ id: serverId })

    return await this.create({
      server,
      sender,
      recipients: [...recipients]
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
