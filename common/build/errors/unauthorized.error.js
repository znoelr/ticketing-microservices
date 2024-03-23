"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnauthorizedError = void 0;
const custom_error_1 = require("./custom-error");
class UnauthorizedError extends custom_error_1.CustomError {
    constructor(message) {
        super(message);
        this.statusCode = 401;
    }
    serializeError() {
        return [{ message: this.message || 'Unauthorized' }];
    }
}
exports.UnauthorizedError = UnauthorizedError;
