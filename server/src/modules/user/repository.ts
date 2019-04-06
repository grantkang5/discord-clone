import { EntityRepository, Repository, Like, In } from 'typeorm'
import { User } from '../../entity/User'
import { Server } from '../../entity/Server'
import { redisClient } from '../..'
import { intersectionBy } from 'lodash'
import { createWriteStream, unlink } from 'fs'
import * as bcrypt from 'bcryptjs'
import * as shortid from 'shortid'

interface Image {
  path?: string,
  filename?: string
  id?: string
}

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

  async editUser({
    userId,
    name,
    email,
    currentPassword,
    newPassword,
    avatar
  }) {
    const user = await this.findOne({ id: userId })
    try {
      const match = await bcrypt.compare(currentPassword, user.password)
      if (!match) {
        throw new Error('Invalid credentials')
      }
      user.email = email
      user.name = name
      if (newPassword) {
        const newHashedPassword = await bcrypt.hash(newPassword, 10)
        user.password = newHashedPassword
      }

      if (avatar && user.avatar) {
        try {
          await unlink(`src/images/${user.avatar}`, (err) => {
            console.log('unlink error: ', err)
          })
        } catch (error) {
          throw new Error(error)
        }
      }

      if (avatar) {
        const { filename, createReadStream } = await avatar
        const stream = createReadStream()
        const { id }: Image = await this.uploadImage({ stream, filename })
        user.avatar = id
      }

      const newUser = await user.save()
      return newUser
    } catch (error) {
      throw new Error(error)
    }
  }

  async onlineUsers({ serverId }) {
    try {
      const server = await Server.findOne({ id: serverId })
      const hashUsers = await redisClient.hgetall('users')
      console.log('hash Users: ', hashUsers)
      const userIds = (Object as any).values(hashUsers)
      const onlineUsers = await this.find({ id: In(userIds) })
      console.log(userIds, onlineUsers)
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

  async uploadImage({ stream, filename }) {
    // FIXME: Add hash id to path
    const id = shortid.generate()
    const path = `src/images/${id}`
    return new Promise((resolve, reject) =>
      stream
        .pipe(createWriteStream(path))
        .on('finish', () => resolve({ path, filename, id }))
        .on('error', reject)
    )
  }
}

export default UserRepository
