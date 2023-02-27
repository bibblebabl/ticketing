import { Publisher, OrderCreatedEvent, Subjects, OrderCancelledEvent } from '@bibblebabl/common'

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled
}
