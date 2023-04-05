import { Listener, OrderCreatedEvent, Subjects } from '@bibblebabl/common'
import { QUEUE_GROUP_NAME } from '.'
import { Message } from 'node-nats-streaming'

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated
  queueGroupName = QUEUE_GROUP_NAME

  async onMessage(data: OrderCreatedEvent['data'], msg: Message) {}
}
