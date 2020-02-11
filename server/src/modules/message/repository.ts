import { EntityRepository, Repository, LessThan } from "typeorm";
import { Message } from "../../entity/Message";
import { Channel } from "../../entity/Channel";
import { User } from "../../entity/User";
import { find } from "lodash";

interface MessageArgs {
  channelId: number;
  cursor: number;
  message: string;
  req: Express.Request;
}

@EntityRepository(Message)
class MessageRepository extends Repository<Message> {
  async getMessages({ channelId, cursor }: Pick<MessageArgs, 'channelId' | 'cursor'>) {
    const options = {
      where: cursor
        ? { channel: { id: channelId }, createdAt: LessThan(cursor) }
        : { channel: { id: channelId } },
      relations: ["sender", "channel"],
      order: {
        createdAt: "DESC"
      },
      take: 35
    };

    const messages = await this.find(options as any);
    return messages;
  }

  async postMessage({ channelId, message, req }: Pick<MessageArgs, 'channelId' | 'message' | 'req'>) {
    if (!req || !req.user) throw new Error('Not authenticated')
    const channel = await Channel.findOne({
      where: { id: channelId },
      relations: ["server"]
    });

    if (!channel) throw new Error("Channel could not be found");
    if (!find(channel.server.users, user => user.id === req.user!.id)) {
      throw new Error(
        "This server no longer exists or you've been kicked from the server"
      );
    }
    const sender = await User.findOne({ id: req.user.id });
    const newMessage = await this.create({
      message,
      channel,
      sender
    }).save();

    return newMessage;
  }
}

export default MessageRepository;
