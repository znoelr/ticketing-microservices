import { BaseNatsPublisher, OrderCreatedEvent, OrderSubjects } from '@mss-ticketing/common';

export class OrderCreatedNatsPublisher extends BaseNatsPublisher<OrderCreatedEvent> {
  readonly subject = OrderSubjects.Created;
}
