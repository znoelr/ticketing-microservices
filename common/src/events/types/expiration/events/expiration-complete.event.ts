import { BaseEvent } from "../../../base";
import { ExpirationSubjects } from "../expiration.subjects";

export type ExpirationCompletePayload = {
  orderId: string;
};

export interface ExpirationCompleteEvent extends BaseEvent {
  subject: typeof ExpirationSubjects.Complete;
  data: ExpirationCompletePayload,
}
