import { Publisher, Subjects, TicketCreatedEvent } from '@bibblebabl/common'

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated
}
