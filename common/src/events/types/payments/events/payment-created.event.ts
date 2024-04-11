import { BaseEvent } from "../../../base";
import { PaymentSubjects } from "../payment.subjects";

export type PaymentCreatedPayload = {
  id: string,
  orderId: string,
  stripeId: string,
};

export interface PaymentCreatedEvent extends BaseEvent {
  subject: typeof PaymentSubjects.Created;
  data: PaymentCreatedPayload,
}