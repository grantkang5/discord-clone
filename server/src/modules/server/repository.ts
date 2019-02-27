import { EntityRepository, Repository } from 'typeorm'
import { Server } from '../../entity/Server'
import { User } from '../../entity/User'

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
    return this.create({
      name,
      host,
      users: [host]
    }).save()
  }

  async deleteServer({ serverId }: { serverId: number }) {
    const serverToDelete = await User.findOne({ id: serverId })
    serverToDelete.remove()
    return serverToDelete
  }

  async addUserToServer({ serverId, userId }) {
    const server = await this.findOne({ id: serverId })
    const user = await User.findOne({ id: userId })
    server.users = [...server.users, user]
    return await server.save()
  }
}

export default ServerRepository
