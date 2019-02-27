import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  Unique,
  ManyToMany,
  JoinTable
} from 'typeorm'
import { User } from './User'

@Unique(["name"])
@Entity()
export class Server extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @ManyToOne(() => User, user => user.hostedServers, { cascade: ["insert", "update"], eager: true })
  host: User

  @ManyToMany(() => User, user => user.joinedServers)
  @JoinTable()
  users: User[]
}
