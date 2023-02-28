import { Message } from 'node-nats-streaming'
import { Listener, NotFoundError, Subjects, TicketUpdatedEvent } from '@bibblebabl/common'
import { QUEUE_GROUP_NAME } from '../../config'
import { Ticket } from '../../models/ticket'

export class TicketUpdatedListener extends Listener<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated
  queueGroupName = QUEUE_GROUP_NAME

  async onMessage(data: TicketUpdatedEvent['data'], msg: Message) {
    // const { id, title, price } = data

    const ticket = await Ticket.findById(data.id)

    if (!ticket) {
      throw new NotFoundError()
    }
    const { title, price } = data
    ticket.set({ title, price })
    await ticket.save()

    msg.ack()
  }
}
