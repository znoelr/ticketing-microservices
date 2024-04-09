import {
  BaseNatsListener,
  ExpirationCompleteEvent,
  ExpirationCompletePayload,
  ExpirationSubjects,
  NatsClient,
  OrderStatus,
} from "@mss-ticketing/common";
import { Message } from "node-nats-streaming";
import { QueueGroupName } from "./queue-group-name";
import { Order } from "../../models/order";
import { OrderCancelledNatsPublisher } from "../publishers/order-cancelled.publisher";

export class ExpirationCompleteNatsListener extends BaseNatsListener<ExpirationCompleteEvent> {
  readonly subject = ExpirationSubjects.Complete;
  queueGroupName: string = QueueGroupName;

  async onMessage(data: ExpirationCompletePayload, msg: Message): Promise<void> {
    const order = await Order.findById(data.orderId).populate('ticket');
    if (!order) {
      throw new Error('Order not found');
    }
    if (order.status === OrderStatus.Complete) {
      msg.ack();
      return;
    }
    order.set({
      status: OrderStatus.Cancelled,
    });
    await order.save();
    await new OrderCancelledNatsPublisher(NatsClient.client).publish({
      id: order.id,
      version: order.version,
      ticket: {
        id: order.ticket.id,
      },
    });
    msg.ack();
  }
}
