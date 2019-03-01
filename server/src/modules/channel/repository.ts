import { EntityRepository, Repository } from 'typeorm'
import { Channel } from '../../entity/Channel'
import { Server } from '../../entity/Server';

@EntityRepository(Channel)
class ChannelRepository extends Repository<Channel> {
  async getServerChannels({ serverId }) {
    const server = await Server.findOne({ id: serverId })
    return server.channels
  }

  async createChannel({ type, name, serverId }) {
    const server = await Server.findOne({ id: serverId })
    const channel = this.create({ type, name, server })
    server.channels = [...server.channels, channel]
    return await channel.save()
  }
}

export default ChannelRepository
