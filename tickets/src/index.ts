import mongoose from 'mongoose';
import { NatsClient } from '@mss-ticketing/common';

import { app } from './app';

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined');
  }
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI must be defined');
  }
  if (!process.env.NATS_URL) {
    throw new Error('NATS_URL must be provided');
  }

  try {
    await NatsClient.connect('ticketing', process.env.NATS_URL!);
    NatsClient.client.on('close', closeNats)

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
