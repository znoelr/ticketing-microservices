import { BaseEvent } from "../../base";
import { TicketSubjects } from "./subjects";

export type TicketUpdatedPayload = {
  id: string,
  title: string,
  price: number,
  userId: string;
};

export interface TicketUpdatedEvent extends BaseEvent {
  subject: typeof TicketSubjects.Updated;
  data: TicketUpdatedPayload,
}
