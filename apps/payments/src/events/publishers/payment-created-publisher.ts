import { PaymentCreatedEvent, Publisher, Subjects } from '@bibblebabl/common'

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  readonly subject = Subjects.PaymentCreated
}
