import { BaseNatsPublisher, PaymentCreatedEvent, PaymentSubjects } from "@mss-ticketing/common";

export class PaymentCreatedPublisher extends BaseNatsPublisher<PaymentCreatedEvent> {
  readonly subject = PaymentSubjects.Created;
}
