import nats, { Message } from 'node-nats-streaming'
import { randomBytes } from 'crypto'

console.clear()

const clientID = randomBytes(4).toString('hex')

const stan = nats.connect('ticketing', clientID, {
  url: 'http://localhost:4222',
})

stan.on('connect', () => {
  console.log('Listener connected to NATS with client ID: ', clientID)

  stan.on('close', () => {
    console.log('NATS connection closed!')
    process.exit()
  })

  const options = stan
    .subscriptionOptions()
    .setDeliverAllAvailable()
    .setDurableName('accounting-service')
    .setManualAckMode(true)

  // .setManualAckMode(true).setMaxInFlight(1).setDeliverAllAvailable().setDurableName('orders-service')

  const subscription = stan.subscribe('ticket:created', 'queue-group-name', options)

  subscription.on('message', (msg: Message) => {
    const data = msg.getData()

    if (typeof data === 'string') {
      console.log(`Received event #${msg.getSequence()}, with data: ${data}`)
    }

    msg.ack()
  })
})

process.on('SIGINT', () => stan.close())
process.on('SIGTERM', () => stan.close())
