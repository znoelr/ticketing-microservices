import { CustomError } from "./custom-error";

export class NotFoundError extends CustomError {
  statusCode: number = 404;

  constructor(message?: string) {
    super(message || '[404] Not Found');
  }

  serializeError() {
    return [{ message: this.message || 'Not found' }];
  }
}
