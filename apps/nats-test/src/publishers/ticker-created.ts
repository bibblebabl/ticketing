import { Subjects } from '../listeners/subjects'
import { TicketCreatedEvent } from '../listeners/ticket-created'
import { Publisher } from './base'

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated
}
