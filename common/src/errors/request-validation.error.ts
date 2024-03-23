import { CustomError } from "./custom-error";

export class RequestValidationError extends CustomError {
  statusCode: number = 400;

  constructor(private errorList: any[]) {
    super('Invalid data was provided');
  }

  serializeError() {
    return this.errorList.map((error) => ({
      message: error.msg,
      field: error.path,
    }));
  }
}
