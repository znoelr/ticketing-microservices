import { CustomError } from "./custom-error";

export class ForbiddenError extends CustomError {
  statusCode: number = 403;

  constructor(message?: string) {
    super(message || '[403] Forbidden');
  }

  serializeError() {
    return [{ message: this.message || 'Forbidden' }];
  }
}
