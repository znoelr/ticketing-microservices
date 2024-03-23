import { CustomError } from "./custom-error";

export class NotFoundError extends CustomError {
  statusCode: number = 404;

  constructor(message: string) {
    super(message);
  }

  serializeError() {
    return [{ message: this.message || 'Not found' }];
  }
}
