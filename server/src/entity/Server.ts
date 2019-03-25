import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  OneToMany,
  Unique,
  ManyToMany,
  JoinTable
} from 'typeorm'
import { User } from './User'
import { Channel } from './Channel'
import { Invitation } from './Invitation'

@Unique(['name'])
@Entity()
export class Server extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @ManyToOne(() => User, user => user.hostedServers, {
    cascade: ['insert', 'update'],
    eager: true
  })
  @JoinTable()
  host: User

  @ManyToMany(() => User, user => user.joinedServers, {
    cascade: true,
    eager: true
  })
  @JoinTable()
  users: User[]

  @OneToMany(() => Channel, channel => channel.server, {
    cascade: ['insert', 'update'],
    eager: true
  })
  channels: Channel[]

  @OneToMany(() => Invitation, invitation => invitation.id, {
    onDelete: 'CASCADE'
  })
  invitations: Invitation[]
}
