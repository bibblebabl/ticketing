import { Publisher, OrderCreatedEvent, Subjects, OrderCancelledEvent } from '@bibblebabl/common'

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  readonly subject = Subjects.OrderCancelled
}
