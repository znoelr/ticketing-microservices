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
  const durableName = 'custom-durable-name';
  const subQueueGroupName = 'custom-queue-group';
  const options = stan.subscriptionOptions()
    .setManualAckMode(true)
    .setDeliverAllAvailable()
    .setDurableName(durableName);
  const subscription = stan.subscribe(
    subGroupName,
    subQueueGroupName, // This option is needed for dumping durable storage
    options
  );

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
