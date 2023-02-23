import { Publisher, Subjects, TicketUpdatedEvent } from '@bibblebabl/common'

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated
}
