import nats from 'node-nats-streaming'
import { Subjects } from './listeners/subjects'
import { TicketCreatedPublisher } from './publishers/ticker-created'

console.clear()
const stan = nats.connect('ticketing', 'abc', {
  url: 'http://localhost:4222',
})

stan.on('connect', () => {
  console.log('Publisher connected to NATS')

  const publisher = new TicketCreatedPublisher(stan)

  publisher.publish({
    id: '123',
    title: 'concert',
    price: 20,
  })
})
