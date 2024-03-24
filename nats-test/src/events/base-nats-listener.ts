import { Message, Stan } from "node-nats-streaming";
import { Subject } from "./subject.enum";

export interface BaseEvent {
  subject: Subject;
  data: any;
};

export abstract class BaseNatsListener<T extends BaseEvent> {
  readonly abstract subject: T['subject'];
  abstract queueGroupName: string;
  protected ackWait = 1000 * 5; // 5s

  abstract onMessage(data: T['data'], msg: Message): void;

  constructor(private client: Stan) {}

  listen() {
    const sub = this.client.subscribe(
      this.subject,
      this.queueGroupName,
      this.getSubOptions()
    );

    sub.on('message', (msg: Message) => {
      console.log(`Message Received: ${this.subject} / ${this.queueGroupName}`);
      const parsedData = this.parseMessage(msg);
      this.onMessage(parsedData, msg);
    })
  }

  private getSubOptions() {
    return this.client
      .subscriptionOptions()
      .setDeliverAllAvailable()
      .setManualAckMode(true)
      .setAckWait(this.ackWait)
      .setDurableName(this.queueGroupName)
    ;
  }

  private parseMessage(msg: Message): any {
    const data = msg.getData();
    if (typeof data === 'string') {
      return JSON.parse(data);
    }
    return JSON.parse(data.toString('utf-8'));
  }
}
