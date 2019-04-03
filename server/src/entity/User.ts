import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  Unique,
  OneToMany,
  ManyToMany
} from 'typeorm'
import { Server } from './Server'
import { Invitation } from './Invitation'
import { Message } from './Message'

@Unique(['email'])
@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  email: string

  @Column()
  password: string

  @Column({ default: 'Goober' })
  name: string

  @Column({ nullable: true })
  avatar: string

  @OneToMany(() => Server, server => server.host)
  hostedServers: Server[]

  @ManyToMany(() => Server, server => server.users)
  joinedServers: Server[]

  @OneToMany(() => Invitation, invitation => invitation.sender)
  sentInvitations: Invitation[]

  @OneToMany(() => Invitation, invitation => invitation.receiver)
  receivedInvitations: Invitation[]

  @OneToMany(() => Message, message => message.sender, {
    cascade: ['insert', 'update'],
    eager: false
  })
  senderMessages: Message[]
}
