import { BaseNatsListener, TicketUpdatedEvent, TicketUpdatedPayload, TicketSubjects, NotFoundError } from "@mss-ticketing/common";
import { Message } from "node-nats-streaming";
import { QueueGroupName } from "./queue-group-name";
import { Ticket } from "../../models/ticket";

export class TicketUpdatedNatsListener extends BaseNatsListener<TicketUpdatedEvent> {
  readonly subject = TicketSubjects.Updated;
  queueGroupName: string = QueueGroupName;

  async onMessage(data: TicketUpdatedPayload, msg: Message): Promise<void> {
    const ticket = await Ticket.findByEvent(data);
    if (!ticket) {
      throw new NotFoundError();
    }
    const { title, price } = data;
    ticket.set({ title, price });
    await ticket.save();
    msg.ack();
  }
}
