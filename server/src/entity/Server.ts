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
import { Channel } from './Channel';

@Unique(["name"])
@Entity()
export class Server extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @ManyToOne(() => User, user => user.hostedServers, { cascade: ["insert", "update"], eager: true })
  host: User

  @ManyToMany(() => User, user => user.joinedServers, { eager: true })
  @JoinTable()
  users: User[]

  @OneToMany(() => Channel, channel => channel.server, { cascade: ["insert", "update"], eager: true })
  channels: Channel[]
}
