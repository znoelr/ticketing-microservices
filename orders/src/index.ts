import mongoose from 'mongoose';
import { app } from './app';
import { TicketCreatedNatsListener } from './events/listeners/ticket-created.listener';
import { NatsClient } from '@mss-ticketing/common';
import { TicketUpdatedNatsListener } from './events/listeners/ticket-updated.listener';

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined');
  }
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI must be defined');
  }
  if (!process.env.NATS_CLIENT_ID) {
    throw new Error('NATS_CLIENT_ID must be defined');
  }
  if (!process.env.NATS_URL) {
    throw new Error('NATS_URL must be defined');
  }
  if (!process.env.NATS_CLUSTER_ID) {
    throw new Error('NATS_CLUSTER_ID must be defined');
  }

  try {
    await NatsClient.connect(
      process.env.NATS_CLUSTER_ID,
      process.env.NATS_CLIENT_ID,
      process.env.NATS_URL
    );
    NatsClient.client.on('close', () => {
      console.log('NATS connection closed!');
      process.exit();
    });
    process.on('SIGINT', () => NatsClient.client.close());
    process.on('SIGTERM', () => NatsClient.client.close());

    new TicketCreatedNatsListener(NatsClient.client).listen();
    new TicketUpdatedNatsListener(NatsClient.client).listen();

    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDb');
  } catch (err) {
    console.error(err);
  }

  app.listen(3000, () => {
    console.log('Listening on port 3000!!!!!!!!');
  });
};

start();
