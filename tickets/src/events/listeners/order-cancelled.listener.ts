import { BaseNatsListener, OrderCancelledEvent, OrderCancelledPayload, OrderSubjects } from "@mss-ticketing/common";
import { Message } from "node-nats-streaming";

export class OrderCancelledNatsListener extends BaseNatsListener<OrderCancelledEvent> {
  readonly subject = OrderSubjects.Cancelled;
  queueGroupName: string = 'payments-service';

  onMessage(data: OrderCancelledPayload, msg: Message): void {
    console.log(data);
    msg.ack();
  }
}
