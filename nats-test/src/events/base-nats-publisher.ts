import { Stan } from "node-nats-streaming";
import { BaseEvent } from "./base-nats-listener";

export abstract class BaseNatsPublisher<T extends BaseEvent> {
  readonly abstract subject: T['subject'];

  constructor(private client: Stan) {}

  publish(data: T['data']) {
    this.client.publish(this.subject, JSON.stringify(data), () => {
      console.log('Event published');
    });
  }
}
