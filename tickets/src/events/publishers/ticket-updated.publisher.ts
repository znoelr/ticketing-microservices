import { BaseNatsPublisher, TicketUpdatedEvent, TicketSubjects } from '@mss-ticketing/common';

export class TicketUpdatedNatsPublisher extends BaseNatsPublisher<TicketUpdatedEvent> {
  readonly subject = TicketSubjects.Updated;
}
