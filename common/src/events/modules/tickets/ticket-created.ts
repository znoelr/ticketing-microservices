import { BaseEvent } from "../../base";
import { TicketSubjects } from "./subjects";

export type TicketCreatedPayload = {
  id: string,
  title: string,
  price: number,
  userId: string;
};

export interface TicketCreatedEvent extends BaseEvent {
  subject: typeof TicketSubjects.Created;
  data: TicketCreatedPayload,
}
