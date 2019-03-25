import { EntityRepository, Repository } from 'typeorm'
import { Server } from '../../entity/Server'
import { User } from '../../entity/User'
import { Channel } from '../../entity/Channel';
import { Invitation } from '../../entity/Invitation';
import { findIndex } from 'lodash'

@EntityRepository(Server)
class ServerRepository extends Repository<Server> {
  async server({ serverId }) {
    try {
      const server = await this.findOne({
        where: { id: serverId }
      })

      return server
    } catch (error) {
      throw new Error(error)
    }
  }

  async getUserServers(userId: number) {
    try {
      const userServers = await this.createQueryBuilder('server')
      .leftJoinAndSelect('server.host', 'host')
      .innerJoin('server.users', 'user')
      .where('user.id = :id', { id: userId })
      .leftJoinAndSelect('server.users', 'users')
      .getMany()
 
      return userServers
    } catch (error) {
      return new Error(error)
    }
  }

  async createServer({ name, userId }: { name: string; userId: number }) {
    const host = await User.findOne({ id: userId })
    const server = await this.create({
      name,
      host,
      users: [host]
    }).save()
    const generalChannel = await Channel.create({
      server,
      type: 'text',
      name: 'general'
    })
    const voiceChannel = await Channel.create({
      server,
      type: 'voice',
      name: 'general'
    })

    server.channels = [generalChannel, voiceChannel]
    return await server.save()
  }

  async deleteServer({ serverId }: { serverId: number }) {
    try {
      const serverToDelete = await this.findOne({ id: serverId })
      serverToDelete.remove()
      return serverToDelete
    } catch (error) {
      throw new Error(error)
    }
  }

  async joinServer({ serverId, userId }) {
    try {
      const server = await this.findOne({ id: serverId })
      const user = await User.findOne({ id: userId })
      const findUser = findIndex(server.users, serverUser => serverUser.id === user.id)
      if (findUser > 0) {
        throw new Error("You're already joined into this server")
      }
      server.users = [...server.users, user]
      return await server.save()
    } catch (error) {
      throw new Error(error)
    }
  }

  async acceptServerInvitation({ invitationId }) {
    try {
      const invitation = await Invitation.findOne({ id: invitationId })
      const user = await User.findOne({ id: invitation.receiver.id })
      const server = await this.findOne({ id: invitation.server.id })
      server.users = [...server.users, user]
      invitation.remove()
      return await server.save()
    } catch (error) {
      throw new Error(error)
    }
  }

  async removeUserFromServer({ userId, serverId }) {
    const server = await this.findOne({ id: serverId })
    const user = await User.findOne({ id: userId })
    server.users = server.users.filter(serverUser => serverUser.id !== user.id)
    server.save()
    return await user
  }
}

export default ServerRepository
