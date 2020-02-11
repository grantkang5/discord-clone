import { EntityRepository, Repository } from 'typeorm'
import { Channel } from '../../entity/Channel'
import { Server } from '../../entity/Server'

interface ChannelArgs {
  channelId: number
  serverId: number
}

interface PostChannelArgs {
  type: "text" | "voice" | undefined
  name: string
  serverId: number
  req: Express.Request
}

interface EditChannelArgs {
  channelId: number
  name: string
  req: Express.Request
}

@EntityRepository(Channel)
class ChannelRepository extends Repository<Channel> {
  async channel({ channelId }: Pick<ChannelArgs, 'channelId'>) {
    const channel = await this.findOne({ id: channelId })
    return channel
  }

  async getServerChannels({ serverId }: Pick<ChannelArgs, 'serverId'>) {
    const server = await Server.findOne({ id: serverId })
    if (!server) throw new Error('Server could not be found')
    return server.channels
  }

  async createChannel({ type, name, serverId, req }: PostChannelArgs) {
    try {
      const server = await Server.findOne({ id: serverId })
      if (!server) throw new Error('Server could not be found')
      if (server.host.id !== req.user!.id) {
        throw new Error('Unauthorized')
      }
      const channel = this.create({ type, name, server })
      server.channels = [...server.channels, channel]
      return await channel.save()
    } catch (error) {
      throw new Error(error)
    }
  }

  async deleteChannel({ channelId, req }: Pick<EditChannelArgs, 'channelId' | 'req'>) {
    try {
      const channel = await Channel.findOne({
        where: { id: channelId },
        relations: ['server']
      })
      if (!channel) throw new Error('Channel could not be found')
      if (channel.server.host.id !== req.user!.id) {
        throw new Error('Unauthorized')
      }
      channel.remove()
      return channel
    } catch (error) {
      throw new Error(error)
    }
  }

  async changeChannel({ channelId, name, req }: EditChannelArgs) {
    try {
      const channel = await Channel.findOne({
        where: { id: channelId },
        relations: ['server']
      })
      if (!channel) throw new Error('Channel could not be found')
      if (channel.server.host.id !== req.user!.id) {
        throw new Error('Unauthorized')
      }
      channel.name = name
      return await channel.save()
    } catch (error) {
      throw new Error(error)
    }
  }
}

export default ChannelRepository
