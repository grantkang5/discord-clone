import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  OneToMany
} from 'typeorm'
import { Server } from './Server'
import { Message } from './Message'

export type ChannelType = 'text' | 'voice'

@Entity()
export class Channel extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ nullable: true })
  name: string

  @Column({ nullable: true, type: 'enum', enum: ['text', 'voice'] })
  type: ChannelType

  @ManyToOne(() => Server, server => server.channels, {
    onDelete: 'CASCADE'
  })
  server: Server

  @OneToMany(() => Message, message => message.channel, {
    cascade: ['insert', 'update'],
    eager: false
  })
  messages: Message[]
}
