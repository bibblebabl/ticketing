import { Message } from 'node-nats-streaming'
import { Listener } from './base-listener'
import { Subjects } from '../subjects'

export interface TicketUpdatedEvent {
  subject: Subjects.TicketUpdated
  data: {
    id: string
    title: string
    price: number
    userId: string
  }
}

export class TicketUpdatedListener extends Listener<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated
  queueGroupName = 'payments-service'

  onMessage(data: TicketUpdatedEvent['data'], msg: Message) {
    console.log('Event data!', data)

    msg.ack()
  }
}
