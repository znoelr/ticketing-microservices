import nats from 'node-nats-streaming';
import { TicketsNatsPublisher } from './events/tickets-nats-publisher';

const stan = nats.connect('ticketing', 'abc', {
  url: 'http://localhost:4222',
});

stan.on('connect', () => {
  console.clear();
  console.log('Publisher connected to NATS');

  const ticketPublisher = new TicketsNatsPublisher(stan);
  ticketPublisher.publish({
    id: '123',
    title: 'concert',
    price: 20,
  });
});
