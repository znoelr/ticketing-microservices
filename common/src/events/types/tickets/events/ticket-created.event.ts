import { BaseEvent } from "../../../base";
import { TicketSubjects } from "../ticket.subjects";

export type TicketCreatedPayload = {
  id: string,
  version: number;
  title: string,
  price: number,
  userId: string;
};

export interface TicketCreatedEvent extends BaseEvent {
  subject: typeof TicketSubjects.Created;
  data: TicketCreatedPayload,
}
