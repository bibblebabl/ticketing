import { OrderCancelledEvent } from '@bibblebabl/common'
import { generateMongooseId } from '../../../../test/helpers'
import { Ticket } from '../../../models/ticket'
import { natsWrapper } from '../../../nats-wrapper'
import { OrderCancelledListener } from '../order-cancelled-listener'

const setup = async () => {
  const listener = new OrderCancelledListener(natsWrapper.client)

  const orderId = generateMongooseId()

  const ticket = Ticket.build({
    title: 'concert',
    price: 20,
    userId: 'asdf',
  }) // when ticket is created, orderId is undefined

  ticket.set({ orderId }) // set orderId to orderId

  await ticket.save()

  const data: OrderCancelledEvent['data'] = {
    id: orderId,
    version: 0,
    ticket: {
      id: ticket.id,
    },
  }

  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  }

  return { listener, ticket, data, msg, orderId }
}

it('updates the ticket, publishes an event, and acks the message', async () => {
  const { listener, ticket, data, msg, orderId } = await setup()

  await listener.onMessage(data, msg)

  const updatedTicket = await Ticket.findById(ticket.id)

  expect(updatedTicket?.orderId).not.toBeDefined()
  expect(msg.ack).toHaveBeenCalled()
  expect(natsWrapper.client.publish).toHaveBeenCalled()
})
