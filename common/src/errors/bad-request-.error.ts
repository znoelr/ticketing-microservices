import { CustomError } from "./custom-error";

export class BadRequestError extends CustomError {
  statusCode: number = 400;

  constructor(message?: string) {
    super(message || '[400] Bad Request');
  }

  serializeError() {
    return [{ message: this.message || 'Bad Request' }];
  }
}
