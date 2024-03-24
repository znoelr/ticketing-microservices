import { randomBytes } from 'crypto';
import nats, { Message } from 'node-nats-streaming';

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

  const subGroupName = 'ticket:created';
  const subQueueGroupName = 'custom-queue-group';
  const options = stan.subscriptionOptions().setManualAckMode(true);
  const subscription = stan.subscribe(subGroupName, subQueueGroupName, options);

  subscription.on('message', (msg: Message) => {
    const data = msg.getData();
    if (typeof data === 'string') {
      console.log(`Received event #${msg.getSequence()}, with data: ${data}`)
    }
    msg.ack();
  });
});

process.on('SIGINT', () => stan.close());
process.on('SIGTERM', () => stan.close());
