import { BaseNatsListener, TicketUpdatedEvent, TicketUpdatedPayload, TicketSubjects } from "@mss-ticketing/common";
import { Message } from "node-nats-streaming";

export class TicketUpdatedNatsListener extends BaseNatsListener<TicketUpdatedEvent> {
  readonly subject = TicketSubjects.Updated;
  queueGroupName: string = 'payments-service';

  onMessage(data: TicketUpdatedPayload, msg: Message): void {
    console.log(data);
    msg.ack();
  }
}
