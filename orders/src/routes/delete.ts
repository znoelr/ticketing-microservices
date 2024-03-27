import {
  NatsClient,
  NotFoundError,
  OrderStatus,
  UnauthorizedError,
  requireAuth,
} from '@mss-ticketing/common';
import express, { Request, Response } from 'express';
import { Order } from '../models/order';
import { OrderCancelledNatsPublisher } from '../events/publishers/order-cancelled.publisher';

const router = express.Router();

router.delete(
  '/api/orders/:orderId',
  requireAuth,
  async (req: Request, res: Response) => {
    const { orderId } = req.params;

    const order = await Order.findById(orderId).populate('ticket');

    if (!order) {
      throw new NotFoundError();
    }
    if (order.userId !== req.currentUser!.id) {
      throw new UnauthorizedError();
    }
    order.status = OrderStatus.Cancelled;
    await order.save();

    // publishing an event saying this was cancelled!
    new OrderCancelledNatsPublisher(NatsClient.client).publish({
      id: order.id,
      ticket: {
        id: order.ticket.id,
      },
    });

    res.status(204).send(order);
  }
);

export { router as deleteOrderRouter };
