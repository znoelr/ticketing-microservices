import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { NatsClient, requireAuth, validateRequest } from '@mss-ticketing/common';
import { Ticket } from '../models/ticket';
import { TicketCreatedNatsPublisher } from '../events/publishers/ticket-created.publisher';

const router = express.Router();

router.post(
  '/api/tickets',
  requireAuth,
  [
    body('title').not().isEmpty().withMessage('Title is required'),
    body('price')
      .isFloat({ gt: 0 })
      .withMessage('Price must be greater than 0'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { title, price } = req.body;

    const ticket = Ticket.build({
      title,
      price,
      userId: req.currentUser!.id,
    });
    await ticket.save();

    /** Publish Ticket Created event */
    await new TicketCreatedNatsPublisher(NatsClient.client).publish({
      id: ticket.id,
      price: ticket.price,
      title: ticket.title,
      userId: ticket.userId,
      version: ticket.version,
    });

    res.status(201).send(ticket);
  }
);

export { router as createTicketRouter };
