import { EntityRepository, Repository } from 'typeorm'
import { Channel } from '../../entity/Channel'
import { Server } from '../../entity/Server'

@EntityRepository(Channel)
class ChannelRepository extends Repository<Channel> {
  async channel({ channelId }) {
    const channel = await this.findOne({ id: channelId })
    return channel
  }

  async getServerChannels({ serverId }) {
    const server = await Server.findOne({ id: serverId })
    return server.channels
  }

  async createChannel({ type, name, serverId, req }) {
    try {
      const server = await Server.findOne({ id: serverId })
      if (server.host.id !== req.user.id) {
        throw new Error('Unauthorized')
      }
      const channel = this.create({ type, name, server })
      server.channels = [...server.channels, channel]
      return await channel.save()
    } catch (error) {
      throw new Error(error)
    }
  }

  async deleteChannel({ channelId, req }) {
    try {
      const channel = await Channel.findOne({
        where: { id: channelId },
        relations: ['server']
      })
      if (channel.server.host.id !== req.user.id) {
        throw new Error('Unauthorized')
      }
      channel.remove()
      return channel
    } catch (error) {
      throw new Error(error)
    }
  }

  async changeChannel({ channelId, name, req }) {
    try {
      const channel = await Channel.findOne({
        where: { id: channelId },
        relations: ['server']
      })
      if (channel.server.host.id !== req.user.id) {
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
