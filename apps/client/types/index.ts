import { OrderStatus } from '@bibblebabl/common'

export interface Ticket {
  id: string
  title: string
  price: number
  userId: string
}

export type Order = {
  id: string
  userId: string
  status: OrderStatus
  expiresAt: Date
  ticket: Ticket
}
