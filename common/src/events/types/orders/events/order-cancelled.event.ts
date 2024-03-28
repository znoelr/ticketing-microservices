import { BaseEvent } from "../../../base";
import { OrderSubjects } from "../order.subjects";

export type OrderCancelledPayload = {
  id: string;
  version: number;
  ticket: {
    id: string;
  };
};

export interface OrderCancelledEvent extends BaseEvent {
  subject: typeof OrderSubjects.Cancelled;
  data: OrderCancelledPayload,
}
