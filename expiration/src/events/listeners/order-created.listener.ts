import { BaseNatsListener, OrderCreatedEvent, OrderCreatedPayload, OrderSubjects } from "@mss-ticketing/common";
import { Message } from "node-nats-streaming";
import { queueGroupName } from "./queue-group-name";
import { expirationQueue } from "../../queues/expiration-queue";

export class OrderCreatedNatsListener extends BaseNatsListener<OrderCreatedEvent> {
  readonly subject = OrderSubjects.Created;
  queueGroupName: string = queueGroupName;

  async onMessage(data: OrderCreatedPayload, msg: Message) {
    const delay = new Date(data.expiresAt).getTime() - new Date().getTime();
    console.log('Delay', delay);
    await expirationQueue.add({
      orderId: data.id,
    }, {
      delay,
    });
    // ack the message
    msg.ack();
  }
}
