import { NatsClient } from "@mss-ticketing/common";
import { OrderCreatedNatsListener } from "./events/listeners/order-created.listener";

const start = async () => {
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
    await new OrderCreatedNatsListener(NatsClient.client).listen();
  } catch (err) {
    console.error(err);
  }
};

start();
