"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAuth = void 0;
const unauthorized_error_1 = require("../errors/unauthorized.error");
const requireAuth = (req, res, next) => {
    if (!req.currentUser) {
        throw new unauthorized_error_1.UnauthorizedError('Unauthorized');
    }
    next();
};
exports.requireAuth = requireAuth;
