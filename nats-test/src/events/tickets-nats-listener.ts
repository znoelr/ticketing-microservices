import { Message } from "node-nats-streaming";
import { BaseEvent, BaseNatsListener } from "./base-nats-listener";
import { Subject } from "./subject.enum";

export interface TicketEvent extends BaseEvent {
  subject: Subject.TicketCreated;
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
