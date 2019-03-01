import { EntityRepository, Repository } from 'typeorm'
import { Server } from '../../entity/Server'
import { User } from '../../entity/User'
import { Channel } from '../../entity/Channel';

@EntityRepository(Server)
class ServerRepository extends Repository<Server> {
  async getUserServers(userId: number) {
    try {
      const userServers = await this.find({ host: { id: userId } })
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

  // TODO - TEST THIS ON PLAYGROUND
  async addUserToServer({ serverId, userId }) {
    const server = await this.findOne({ id: serverId })
    const user = await User.findOne({ id: userId })
    server.users = [...server.users, user]
    return await server.save()
  }
}

export default ServerRepository
