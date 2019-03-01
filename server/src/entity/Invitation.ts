import {
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
  ManyToMany,
  JoinTable,
  JoinColumn,
  CreateDateColumn,
  OneToOne
} from 'typeorm'
import { User } from './User';
import { Server } from './Server';

export type InvitationType = 'server' | 'friend'

@Entity()
export class Invitation extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @CreateDateColumn()
  createdAt: Date
  
  @OneToOne(() => Server)
  @JoinColumn()
  server: Server 

  @ManyToOne(() => User, user => user.sentInvitations, { cascade: ["insert", "update"], eager: true })
  sender: User

  @ManyToMany(() => User, user => user.receivedInvitations, { cascade: ["insert", "update"], eager: true })
  @JoinTable()
  recipients: User[]
}
 