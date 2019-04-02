import {
  BaseEntity,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Index
} from 'typeorm'
import { Channel } from './Channel'
import { User } from './User'

@Entity()
export class Message extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Index()
  @CreateDateColumn()
  createdAt: Date

  @Column()
  message: string

  @ManyToOne(() => User, user => user.senderMessages, {
    cascade: ['insert', 'update'],
    eager: true
  })
  sender: User

  @ManyToOne(() => Channel, channel => channel.messages, {
    cascade: ['insert', 'update'],
    eager: true,
    onDelete: "CASCADE"
  })
  channel: Channel
}
