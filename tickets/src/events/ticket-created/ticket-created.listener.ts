import { BaseNatsListener, TicketCreatedEvent, TicketCreatedPayload, TicketSubjects } from "@mss-ticketing/common";
import { Message } from "node-nats-streaming";

export class TicketCreatedNatsListener extends BaseNatsListener<TicketCreatedEvent> {
  readonly subject = TicketSubjects.Created;
  queueGroupName: string = 'payments-service';

  onMessage(data: TicketCreatedPayload, msg: Message): void {
    console.log(data);
    msg.ack();
  }
}
