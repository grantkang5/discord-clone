import { EntityRepository, Repository } from 'typeorm'
import { Channel } from '../../entity/Channel'
import { Server } from '../../entity/Server'

@EntityRepository(Channel)
class ChannelRepository extends Repository<Channel> {
  async getServerChannels({ serverId }) {
    const server = await Server.findOne({ id: serverId })
    return server.channels
  }

  async createChannel({ type, name, serverId }) {
    try {
      const server = await Server.findOne({ id: serverId })
      const channel = this.create({ type, name, server })
      server.channels = [...server.channels, channel]
      return await channel.save()
    } catch (error) {
      throw new Error(error)
    }
  }

  async deleteChannel({ channelId }) {
    try {
      const channel = await Channel.findOne({
        where: { id: channelId },
        relations: ['server']
      })
      channel.remove()
      return channel
    } catch (error) {
      throw new Error(error)
    }
  }

  async changeChannel({ channelId, name }) {
    try {
      const channel = await Channel.findOne({
        where: { id: channelId },
        relations: ['server']
      })
      channel.name = name
      return await channel.save()
    } catch (error) {
      throw new Error(error)
    }
  }
}

export default ChannelRepository
