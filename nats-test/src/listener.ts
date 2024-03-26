import { randomBytes } from 'crypto';
import nats, { Message, Stan } from 'node-nats-streaming';
import { TicketsNatsListener, TicketsUpdatedNatsListener } from './events/tickets-nats-listener';

const clientId = randomBytes(6).toString('hex');
const stan = nats.connect('ticketing', clientId, {
  url: 'http://localhost:4222',
});

stan.on('connect', () => {
  console.clear();
  console.log('Listener connected to NATS');

  stan.on('close', () => {
    console.log('CLosing NATS connection');
    process.exit();
  });

  const ticketClient = new TicketsNatsListener(stan).listen();
  new TicketsUpdatedNatsListener(stan).listen();
});

process.on('SIGINT', () => stan.close());
process.on('SIGTERM', () => stan.close());
