import mongoose from 'mongoose';
import { NatsClient } from '@mss-ticketing/common';

import { app } from './app';
import { OrderCreatedNatsListener } from './events/listeners/order-created.listener';
import { OrderCancelledNatsListener } from './events/listeners/order-cancelled.listener';

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined');
  }
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI must be defined');
  }
  if (!process.env.NATS_CLUSTER_ID) {
    throw new Error('NATS_CLUSTER_ID must be provided');
  }
  if (!process.env.NATS_CLIENT_ID) {
    throw new Error('NATS_CLIENT_ID must be provided');
  }
  if (!process.env.NATS_URL) {
    throw new Error('NATS_URL must be provided');
  }

  try {
    await NatsClient.connect(
      process.env.NATS_CLUSTER_ID!,
      process.env.NATS_CLIENT_ID!,
      process.env.NATS_URL!
    );
    NatsClient.client.on('close', closeNats);

    await new OrderCreatedNatsListener(NatsClient.client).listen();
    await new OrderCancelledNatsListener(NatsClient.client).listen();

    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDb');
  } catch (err) {
    console.error(err);
  }

  app.listen(3000, () => {
    console.log('Listening on port 3000!!!!!!!!');
  });
};

const closeNats = () => {
  console.log('Closing NATS...');
  NatsClient.close();
  process.exit(1);
}

process.on('SIGINT', closeNats);
process.on('SIGTERM', closeNats);

start();
