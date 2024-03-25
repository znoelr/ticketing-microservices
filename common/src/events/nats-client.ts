import { randomBytes } from 'crypto';
import nats, { Stan } from 'node-nats-streaming';

export class NatsClient {
  private static _client: Stan;

  static get client() {
    if (!NatsClient._client) {
      throw new Error('Cannot access NATS client before starting calling connect');
    }
    return NatsClient._client;
  }

  static connect(clusterId: string, url: string): Promise<void> {
    const clientId = randomBytes(6).toString('hex');

    NatsClient._client = nats.connect(clusterId, clientId, { url });

    return new Promise<void>((resolve, reject) => {
      NatsClient.client.on('connect', () => {
        console.log('Publisher connected to NATS');
        resolve();
      });
      NatsClient.client.on('error', (err) => {
        reject(err);
      });
    });
  }

  static close() {
    NatsClient.client.close();
  }
}