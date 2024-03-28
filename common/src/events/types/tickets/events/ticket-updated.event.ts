import { BaseEvent } from "../../../base";
import { TicketSubjects } from "../ticket.subjects";

export type TicketUpdatedPayload = {
  id: string,
  version: number;
  title: string,
  price: number,
  userId: string;
  orderId?: string;
};

export interface TicketUpdatedEvent extends BaseEvent {
  subject: typeof TicketSubjects.Updated;
  data: TicketUpdatedPayload,
}
