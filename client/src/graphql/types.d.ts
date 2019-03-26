export type Maybe<T> = T | undefined | null;

export interface User {
  id: string | number
  name?: string
  email?: string
  password?: string
  hostedServers?: [Server]
  joinedServers?: [Server]
}

export interface Server {
  id: string | number
  name: string
  host: { id: string | number; email: string }
  users?: [User]
  channels: [Channel]
}

export interface Channel {
  id: string | number
  name: string
  type: 'text' | 'voice'
}

export interface Message {
  id: string | number
  createdAt: Date
  message: string
  sender?: User
  channel?: Channel
}