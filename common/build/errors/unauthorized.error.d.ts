import { CustomError } from "./custom-error";
export declare class UnauthorizedError extends CustomError {
    statusCode: number;
    constructor(message: string);
    serializeError(): {
        message: string;
    }[];
}
