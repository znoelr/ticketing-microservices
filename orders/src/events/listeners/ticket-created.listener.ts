import { BaseNatsListener, TicketCreatedEvent, TicketCreatedPayload, TicketSubjects } from "@mss-ticketing/common";
import { Message } from "node-nats-streaming";
import { QueueGroupName } from "./queue-group-name";
import { Ticket } from "../../models/ticket";

export class TicketCreatedNatsListener extends BaseNatsListener<TicketCreatedEvent> {
  readonly subject = TicketSubjects.Created;
  queueGroupName: string = QueueGroupName;

  async onMessage(data: TicketCreatedPayload, msg: Message): Promise<void> {
    const { id, title, price } = data;
    const ticket = Ticket.build({ id, title, price });
    await ticket.save();
    msg.ack();
  }
}
