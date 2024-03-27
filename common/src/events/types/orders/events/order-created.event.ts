import { BaseEvent } from "../../../base";
import { OrderSubjects } from "../order.subjects";
import { OrderStatusValue } from "../order.types";

export type OrderCreatedPayload = {
  id: string;
  status: OrderStatusValue;
  userId: string;
  expiresAt: string;
  ticket: {
    id: string;
    price: number;
  };
};

export interface OrderCreatedEvent extends BaseEvent {
  subject: typeof OrderSubjects.Created;
  data: OrderCreatedPayload,
}
