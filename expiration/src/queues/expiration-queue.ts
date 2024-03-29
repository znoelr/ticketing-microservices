import Queue from 'bull';
import { NatsClient } from '@mss-ticketing/common';
import { ExpirationCompleteNatsPublisher } from '../events/publishers/expiration-complete.publisher';

interface Payload {
  orderId: string;
}

const expirationQueue = new Queue<Payload>('order:expiration', {
  redis: {
    host: process.env.REDIS_HOST,
  },
});

expirationQueue.process(async (job) => {
  new ExpirationCompleteNatsPublisher(NatsClient.client).publish({
    orderId: job.data.orderId,
  });
});

export { expirationQueue };
