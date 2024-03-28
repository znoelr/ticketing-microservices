import { Stan } from "node-nats-streaming";
import { BaseEvent } from "./types";

export abstract class BaseNatsPublisher<T extends BaseEvent> {
  readonly abstract subject: T['subject'];

  constructor(protected client: Stan) {}

  publish(data: T['data']): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.client.publish(this.subject, JSON.stringify(data), (err) => {
        if (err) return reject(err);
        console.log('Event published:', this.subject);
        resolve();
      });
    });
  }
}
