import { BaseNatsListener, OrderCreatedEvent, OrderCreatedPayload, OrderSubjects } from "@mss-ticketing/common";
import { Message } from "node-nats-streaming";
import { queueGroupName } from "./queue-group-name";
import { Ticket } from "../../models/ticket";
import { TicketUpdatedNatsPublisher } from "../publishers/ticket-updated.publisher";

export class OrderCreatedNatsListener extends BaseNatsListener<OrderCreatedEvent> {
  readonly subject = OrderSubjects.Created;
  queueGroupName: string = queueGroupName;

  async onMessage(data: OrderCreatedPayload, msg: Message) {
    // Find the ticket that the order is reserving
    const ticket = await Ticket.findById(data.ticket.id);
    // If no ticket, throw error
    if (!ticket) {
      throw new Error('Ticket not found');
    }
    // Mark the ticket as being reserved by setting its orderId property
    ticket.set({ orderId: data.id });
    // Save the ticket
    await ticket.save();
    // Publish ticket updated event
    new TicketUpdatedNatsPublisher(this.client).publish({
      id: ticket.id,
      price: ticket.price,
      title: ticket.title,
      userId: ticket.userId,
      orderId: ticket.orderId,
      version: ticket.version,
    });
    // ack the message
    msg.ack();
  }
}
