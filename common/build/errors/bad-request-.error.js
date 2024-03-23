"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadRequestError = void 0;
const custom_error_1 = require("./custom-error");
class BadRequestError extends custom_error_1.CustomError {
    constructor(message) {
        super(message);
        this.statusCode = 400;
    }
    serializeError() {
        return [{ message: this.message || 'Bad Request' }];
    }
}
exports.BadRequestError = BadRequestError;
