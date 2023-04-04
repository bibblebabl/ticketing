import { Publisher, OrderCreatedEvent, Subjects } from '@bibblebabl/common'

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated
}
