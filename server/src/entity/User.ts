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

@Unique(['email'])
@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  email: string

  @Column()
  password: string

  @OneToMany(() => Server, server => server.host)
  hostedServers: Server[]

  @ManyToMany(() => Server, server => server.users)
  joinedServers: Server[]

  @OneToMany(() => Invitation, invitation => invitation.sender)
  sentInvitations: Invitation[]

  @ManyToMany(() => Invitation, invitation => invitation.recipients)
  receivedInvitations: Invitation[]
}
