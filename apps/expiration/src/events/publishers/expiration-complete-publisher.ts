import { ExpirationCompleteEvent, Publisher, Subjects } from '@bibblebabl/common'

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  readonly subject = Subjects.ExpirationComplete
}
