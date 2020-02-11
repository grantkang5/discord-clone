import { EntityRepository, Repository, Like, In } from 'typeorm'
import { User } from '../../entity/User'
import { Server } from '../../entity/Server'
import { redisClient } from '../..'
import { intersectionBy } from 'lodash'
import { createWriteStream, unlink } from 'fs'
import bcrypt from 'bcryptjs'
import shortid from 'shortid'

import { Stream } from 'stream';

export interface Upload {
  filename: string;
  mimetype: string;
  encoding: string;
  createReadStream: () => Stream;
}

interface Image {
  path: string,
  filename: string
  id: string
}

interface EditUser {
  userId: User["id"]
  name: string
  email: string
  currentPassword: string
  newPassword: string
  avatar: Upload
}

@EntityRepository(User)
class UserRepository extends Repository<User> {
  async findById(id: number) {
    return this.findOne({ id })
  }

  async editName({ userId, name }: Pick<EditUser, 'userId' | 'name'>) {
    const user = await this.findOne({ id: userId })
    if (!user) throw new Error('This user doesn\'t exist')
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
  }: EditUser) {
    const user = await this.findOne({ id: userId })
    if (!user) throw new Error('This user doesn\'t exist')
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
           unlink(`src/images/${user.avatar}`, (err) => {
            console.log('unlink error: ', err)
          })
        } catch (error) {
          throw new Error(error)
        }
      }

      if (avatar) {
        const { filename, createReadStream } = avatar
        const stream = createReadStream()
        const createdImage = await this.uploadImage({ stream, filename })
        user.avatar = (createdImage as Image).id
      }

      const newUser = await user.save()
      return newUser
    } catch (error) {
      throw new Error(error)
    }
  }

  async onlineUsers({ serverId }: { serverId: number }) {
    try {
      const server = await Server.findOne({ id: serverId })
      if (!server) throw new Error('This server doesn\'t exist')
      const hashUsers = await redisClient.hgetall('users')
      const userIds = (Object as any).values(hashUsers)
      const onlineUsers = await this.find({ id: In(userIds) })
      const users = intersectionBy(server.users, onlineUsers, 'id')
      return users
    } catch (error) {
      throw new Error(error)
    }
  }

  async getUsersByName({ name }: { name: string }) {
    return await this.find({
      where: {
        name: Like(`${name}%`)
      },
      take: 10
    })
  }

  async uploadImage({ stream, filename }: { stream: any, filename: string }) {
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
