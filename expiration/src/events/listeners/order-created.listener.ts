import { BaseNatsListener, OrderCreatedEvent, OrderCreatedPayload, OrderSubjects } from "@mss-ticketing/common";
import { Message } from "node-nats-streaming";
import { queueGroupName } from "./queue-group-name";

export class OrderCreatedNatsListener extends BaseNatsListener<OrderCreatedEvent> {
  readonly subject = OrderSubjects.Created;
  queueGroupName: string = queueGroupName;

  async onMessage(data: OrderCreatedPayload, msg: Message) {
    // ack the message
    msg.ack();
  }
}
