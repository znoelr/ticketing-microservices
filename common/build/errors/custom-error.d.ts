export declare abstract class CustomError extends Error {
    abstract statusCode: number;
    constructor(message: string);
    abstract serializeError(): {
        message: string;
        filed?: string;
    }[];
}
