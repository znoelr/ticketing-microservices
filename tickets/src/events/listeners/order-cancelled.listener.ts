import { BaseNatsListener, OrderCancelledEvent, OrderCancelledPayload, OrderSubjects } from "@mss-ticketing/common";
import { Message } from "node-nats-streaming";
import { queueGroupName } from "./queue-group-name";
import { Ticket } from "../../models/ticket";
import { TicketUpdatedNatsPublisher } from "../publishers/ticket-updated.publisher";

export class OrderCancelledNatsListener extends BaseNatsListener<OrderCancelledEvent> {
  readonly subject = OrderSubjects.Cancelled;
  queueGroupName: string = queueGroupName;

  async onMessage(data: OrderCancelledPayload, msg: Message) {
    const ticket = await Ticket.findById(data.ticket.id);
    if (!ticket) {
      throw new Error('Ticket not found');
    }
    ticket.set({ orderId: undefined });
    await ticket.save();
    await new TicketUpdatedNatsPublisher(this.client).publish({
      id: ticket.id,
      userId: ticket.userId,
      price: ticket.price,
      title: ticket.title,
      orderId: ticket.orderId,
      version: ticket.version,
    });
    msg.ack();
  }
}
