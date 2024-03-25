import { Subject } from "./subject.enum";
import { BaseNatsPublisher } from "./base-nats-publisher";
import { TicketEvent } from "./tickets-nats-listener";

export class TicketsNatsPublisher extends BaseNatsPublisher<TicketEvent> {
  readonly subject = Subject.TicketCreated;
}
