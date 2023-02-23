import { Publisher, Subjects, TicketCreatedEvent } from '@bibblebabl/common'

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated
}
