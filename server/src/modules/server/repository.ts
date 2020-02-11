import { EntityRepository, Repository } from 'typeorm'
import { Server } from '../../entity/Server'
import { User } from '../../entity/User'
import { Channel } from '../../entity/Channel'
import { Invitation } from '../../entity/Invitation'
import { findIndex } from 'lodash'
import { pubsub, USER_JOINED_SERVER, USER_LEFT_SERVER } from '../subscriptions'

import { find } from 'lodash'

interface ServerArgs {
  serverId: number
  userId: number
  req: Express.Request
}

@EntityRepository(Server)
class ServerRepository extends Repository<Server> {
  async server({ serverId, req }: Pick<ServerArgs, 'serverId' | 'req'>) {
    try {
      if (!req || !req.user) throw new Error('Not authenticated')
      const server = await this.findOne({
        where: { id: serverId }
      })
      if (!server) throw new Error('Server could not be found')

      if (!find(server.users, user => user.id === req.user!.id)) {
        throw new Error('Unauthorized')
      }

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
    if (!host) throw new Error('No host could be found')
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
      if (!serverToDelete) throw new Error('No server could be found')
      serverToDelete.remove()
      return serverToDelete
    } catch (error) {
      throw new Error(error)
    }
  }

  async joinServer({ serverId, userId }: Pick<ServerArgs, 'serverId' | 'userId'>) {
    try {
      const server = await this.findOne({ id: serverId })
      const user = await User.findOne({ id: userId })
      if (!server || !user) throw new Error('Data could not be found')
      const findUser = findIndex(
        server.users,
        serverUser => serverUser.id === user.id
      )
      if (findUser > 0) {
        throw new Error("You're already joined into this server")
      }
      server.users = [...server.users, user]
      const joinedServer = await server.save()
      pubsub.publish(USER_JOINED_SERVER, {
        userJoinedServer: { server: joinedServer, user }
      })
      return joinedServer
    } catch (error) {
      throw new Error(error)
    }
  }

  async acceptServerInvitation({ invitationId }: { invitationId: number }) {
    try {
      const invitation = await Invitation.findOne({ id: invitationId })
      if (!invitation) throw new Error('Invitation could not be found')
      const user = await User.findOne({ id: invitation.receiver.id })
      const server = await this.findOne({ id: invitation.server.id })
      if (!server || !user) throw new Error('Data could not be found')

      server.users = [...server.users, user]
      invitation.remove()
      const joinedServer = await server.save()
      pubsub.publish(USER_JOINED_SERVER, {
        userJoinedServer: { server: joinedServer, user }
      })
      return joinedServer
    } catch (error) {
      throw new Error(error)
    }
  }

  async removeUserFromServer({ userId, serverId }: Pick<ServerArgs, 'userId' | 'serverId'>) {
    const server = await this.findOne({ id: serverId })
    const user = await User.findOne({ id: userId })
    if (!server || !user) throw new Error('Data could not be found')
    server.users = server.users.filter(serverUser => serverUser.id !== user.id)
    const leftServer = await server.save()
    pubsub.publish(USER_LEFT_SERVER, {
      removedUser: { server: leftServer, user }
    })
    return leftServer
  }
}

export default ServerRepository
