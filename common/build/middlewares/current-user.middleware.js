"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.currentUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const currentUser = (req, res, next) => {
    var _a;
    const token = ((_a = req.session) === null || _a === void 0 ? void 0 : _a.jwt) || '';
    if (!token) {
        next();
        return;
    }
    try {
        // Verify JWT
        const jwtPayload = jsonwebtoken_1.default.verify(token, process.env.JWT_KEY);
        req.currentUser = jwtPayload;
    }
    finally {
        next();
    }
};
exports.currentUser = currentUser;
