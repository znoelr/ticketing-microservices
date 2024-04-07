import {
  PaymentCreatedEvent,
  OrderStatus,
  PaymentSubjects,
  BaseNatsListener,
} from '@mss-ticketing/common';
import { Message } from 'node-nats-streaming';
import { QueueGroupName } from './queue-group-name';
import { Order } from '../../models/order';

export class PaymentCreatedListener extends BaseNatsListener<PaymentCreatedEvent> {
  readonly subject = PaymentSubjects.Created;
  queueGroupName = QueueGroupName;

  async onMessage(data: PaymentCreatedEvent['data'], msg: Message) {
    const order = await Order.findById(data.orderId);

    if (!order) {
      throw new Error('Order not found');
    }

    order.set({
      status: OrderStatus.Complete,
    });
    await order.save();

    msg.ack();
  }
}
