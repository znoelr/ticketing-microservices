import { BaseNatsPublisher, OrderCancelledEvent, OrderSubjects } from '@mss-ticketing/common';

export class OrderCancelledNatsPublisher extends BaseNatsPublisher<OrderCancelledEvent> {
  readonly subject = OrderSubjects.Cancelled;
}
