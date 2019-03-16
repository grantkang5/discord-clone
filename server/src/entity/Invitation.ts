import {
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
  JoinTable,
  CreateDateColumn,
} from 'typeorm'
import { User } from './User'
import { Server } from './Server'

export type InvitationType = 'server' | 'friend'

@Entity()
export class Invitation extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @CreateDateColumn()
  createdAt: Date

  @ManyToOne(() => Server, server => server.id, {
    cascade: ['insert', 'update'],
    eager: true,
    onDelete: "CASCADE"
  })
  server: Server

  @ManyToOne(() => User, user => user.sentInvitations, {
    cascade: ['insert', 'update'],
    eager: true
  })
  sender: User

  @ManyToOne(() => User, user => user.receivedInvitations, {
    cascade: ['insert', 'update'],
    eager: true
  })
  @JoinTable()
  receiver: User
}
