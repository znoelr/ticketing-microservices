import { BaseNatsPublisher, TicketCreatedEvent, TicketSubjects } from '@mss-ticketing/common';

export class TicketCreatedNatsPublisher extends BaseNatsPublisher<TicketCreatedEvent> {
  readonly subject = TicketSubjects.Created;
}
