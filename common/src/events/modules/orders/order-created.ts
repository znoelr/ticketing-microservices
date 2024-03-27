import { BaseEvent } from "../../base";
import { OrderStatusValue } from "../../types";
import { OrderSubjects } from "./subjects";

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
