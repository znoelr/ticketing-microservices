import { BaseNatsPublisher, ExpirationCompleteEvent, ExpirationSubjects } from "@mss-ticketing/common";

export class ExpirationCompleteNatsPublisher extends BaseNatsPublisher<ExpirationCompleteEvent> {
  readonly subject = ExpirationSubjects.Complete;
}
