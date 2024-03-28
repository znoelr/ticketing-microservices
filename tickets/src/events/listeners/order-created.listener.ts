import { BaseNatsListener, OrderCreatedEvent, OrderCreatedPayload, OrderSubjects } from "@mss-ticketing/common";
import { Message } from "node-nats-streaming";

export class OrderCreatedNatsListener extends BaseNatsListener<OrderCreatedEvent> {
  readonly subject = OrderSubjects.Created;
  queueGroupName: string = 'payments-service';

  onMessage(data: OrderCreatedPayload, msg: Message): void {
    console.log(data);
    msg.ack();
  }
}
