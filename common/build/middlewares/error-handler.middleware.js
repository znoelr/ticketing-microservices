"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errors_1 = require("../errors");
const errorHandler = (err, req, res, next) => {
    if (err instanceof errors_1.CustomError) {
        return res.status(err.statusCode).json({
            errors: err.serializeError(),
        });
    }
    res.status(500).json({
        errors: [
            { message: err.message || 'Something went wrong' },
        ]
    });
};
exports.errorHandler = errorHandler;
