import { EntityRepository, Repository, Like, In } from 'typeorm'
import { User } from '../../entity/User'
import { Server } from '../../entity/Server'
import { redisClient } from '../..'
import { intersectionBy } from 'lodash'

@EntityRepository(User)
class UserRepository extends Repository<User> {
  async findById(id: number) {
    return this.findOne({ id })
  }

  async editName({ userId, name }) {
    const user = await this.findOne({ id: userId })
    user.name = name
    return await user.save()
  }

  async onlineUsers({ serverId }) {
    try {
      const server = await Server.findOne({ id: serverId })
      const hashUsers = await redisClient.hgetall('users')
      const userIds = (Object as any).values(hashUsers)
      const onlineUsers = await this.find({ id: In(userIds) })
      const users = intersectionBy(server.users, onlineUsers, 'id')
      return users
    } catch (error) {
      throw new Error(error)
    }
  }

  async getUsersByName({ name }) {
    return await this.find({
      where: {
        name: Like(`${name}%`)
      },
      take: 10
    })
  }
}

export default UserRepository
