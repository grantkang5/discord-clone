import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne
} from 'typeorm'
import { Server } from './Server'

export type ChannelType = 'text' | 'voice'

@Entity()
export class Channel extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column({ type: 'enum', enum: ['text', 'voice'] })
  type: ChannelType

  @ManyToOne(() => Server, server => server.channels, {
    onDelete: "CASCADE"
  })
  server: Server
}
