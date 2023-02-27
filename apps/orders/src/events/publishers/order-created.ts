import { Publisher, OrderCreatedEvent, Subjects } from '@bibblebabl/common'

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated
}
