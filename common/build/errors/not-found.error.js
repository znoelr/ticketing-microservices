"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundError = void 0;
const custom_error_1 = require("./custom-error");
class NotFoundError extends custom_error_1.CustomError {
    constructor(message) {
        super(message);
        this.statusCode = 404;
    }
    serializeError() {
        return [{ message: this.message || 'Not found' }];
    }
}
exports.NotFoundError = NotFoundError;
