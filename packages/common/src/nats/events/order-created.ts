import { OrderStatus } from '../../types/orders'
import { Subjects } from '../subjects'

export interface OrderCreatedEvent {
  subject: Subjects.OrderCreated
  data: {
    id: string
    status: OrderStatus
    userId: string
    expiresAt: string
    ticket: {
      id: string
      price: number
    }
  }
}
