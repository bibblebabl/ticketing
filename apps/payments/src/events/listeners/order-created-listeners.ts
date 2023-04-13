import { Listener, OrderCreatedEvent, Subjects } from '@bibblebabl/common'
import { QUEUE_GROUP_NAME } from './queue-group-name'
import { Message } from 'node-nats-streaming'
import { Order } from '../../models/order'

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated
  queueGroupName = QUEUE_GROUP_NAME

  async onMessage(data: OrderCreatedEvent['data'], msg: Message) {
    const order = Order.build({
      id: data.id,
      version: data.version,
      price: data.ticket.price,
      userId: data.userId,
      status: data.status,
    })

    await order.save()

    msg.ack()
  }
}
