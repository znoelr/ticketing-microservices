import { CustomError } from "./custom-error";
export declare class RequestValidationError extends CustomError {
    private errorList;
    statusCode: number;
    constructor(errorList: any[]);
    serializeError(): {
        message: any;
        field: any;
    }[];
}
