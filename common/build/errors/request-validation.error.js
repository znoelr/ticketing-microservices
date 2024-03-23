"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestValidationError = void 0;
const custom_error_1 = require("./custom-error");
class RequestValidationError extends custom_error_1.CustomError {
    constructor(errorList) {
        super('Invalid data was provided');
        this.errorList = errorList;
        this.statusCode = 400;
    }
    serializeError() {
        return this.errorList.map((error) => ({
            message: error.msg,
            field: error.path,
        }));
    }
}
exports.RequestValidationError = RequestValidationError;
