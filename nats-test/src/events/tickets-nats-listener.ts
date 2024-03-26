import { Message } from "node-nats-streaming";
import { BaseEvent, BaseNatsListener } from "./base-nats-listener";
import { Subject } from "./subject.enum";

export interface TicketEvent extends BaseEvent {
  subject: typeof Subject.TicketCreated;
  data: {
    id: string,
    title: string,
    price: number,
  },
}

export class TicketsNatsListener extends BaseNatsListener<TicketEvent> {
  readonly subject = Subject.TicketCreated;
  queueGroupName: string = 'payments-service';

  onMessage(data: TicketEvent['data'], msg: Message): void {
    console.log(data);
    msg.ack();
  }
}

export interface TicketUpdatedEvent extends BaseEvent {
  subject: typeof Subject.TicketUpdated;
  data: {
    id: string,
    title: string,
    price: number,
  },
}

export class TicketsUpdatedNatsListener extends BaseNatsListener<TicketUpdatedEvent> {
  readonly subject = Subject.TicketUpdated;
  queueGroupName: string = 'payments-service';

  onMessage(data: TicketUpdatedEvent['data'], msg: Message): void {
    console.log(data);
    msg.ack();
  }
}
