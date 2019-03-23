import { EntityRepository, Repository } from 'typeorm'
import { Message } from '../../entity/Message'
import { Channel } from '../../entity/Channel';
import { User } from '../../entity/User';

@EntityRepository(Message)
class MessageRepository extends Repository<Message> {
  async getMessages({ channelId }) {
    const messages = await this.find({
      where: { channel: { id: channelId }},
      relations: ['sender', 'channel']
    })
    return messages
  }

  async postMessage({ channelId, message, req }) {
    const channel = await Channel.findOne({ id: channelId })
    const sender = await User.findOne({ id: req.user.id })
    const newMessage = await this.create({
      message,
      channel,
      sender
    }).save()

    return newMessage
  }
}

export default MessageRepository
