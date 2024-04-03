import {
  BaseNatsListener,
  OrderCancelledEvent,
  OrderCancelledPayload,
  OrderStatus,
  OrderSubjects,
} from '@mss-ticketing/common';
import { Message } from 'node-nats-streaming';
import { queueGroupName } from './queue-group-name';
import { Order } from '../../models/order';

export class OrderCancelledListener extends BaseNatsListener<OrderCancelledEvent> {
  readonly subject = OrderSubjects.Cancelled;
  queueGroupName = queueGroupName;

  async onMessage(data: OrderCancelledPayload, msg: Message) {
    const order = await Order.findOne({
      _id: data.id,
      version: data.version - 1,
    });

    if (!order) {
      throw new Error('Order not found');
    }

    order.set({ status: OrderStatus.Cancelled });
    await order.save();

    msg.ack();
  }
}
