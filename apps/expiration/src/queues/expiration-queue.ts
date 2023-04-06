import Queue from 'bull'
import { env } from '../config'
import { natsWrapper } from '../nats-wrapper'
import { ExpirationCompletePublisher } from '../events/publishers/expiration-complete-publisher'

interface Payload {
  orderId: string
}

const expirationQueue = new Queue<Payload>('order:expiration', {
  redis: {
    host: env.REDIS_HOST,
  },
})

expirationQueue.process(async (job) => {
  await new ExpirationCompletePublisher(natsWrapper.client).publish({
    orderId: job.data.orderId,
  })
})

export { expirationQueue }
