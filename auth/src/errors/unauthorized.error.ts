import { CustomError } from "./custom-error";

export class UnauthorizedError extends CustomError {
  statusCode: number = 401;

  constructor(message: string) {
    super(message);
  }

  serializeError() {
    return [{ message: this.message || 'Unauthorized' }];
  }
}
