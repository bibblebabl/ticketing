import { Message } from 'node-nats-streaming'
import { Listener, NotFoundError, Subjects, TicketUpdatedEvent } from '@bibblebabl/common'
import { QUEUE_GROUP_NAME } from '../../config'
import { Ticket } from '../../models/ticket'

export class TicketUpdatedListener extends Listener<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated
  queueGroupName = QUEUE_GROUP_NAME

  async onMessage(data: TicketUpdatedEvent['data'], msg: Message) {
    const ticket = await Ticket.findById({
      _id: data.id,
      version: data.version - 1,
    })

    if (!ticket) {
      throw new Error('Ticket not found')
    }

    const { title, price } = data
    ticket.set({ title, price })
    await ticket.save()

    msg.ack()
  }
}
