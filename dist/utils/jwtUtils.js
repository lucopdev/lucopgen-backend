"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
class JwtUtils {
    static generateJwtToken(payload) {
        return jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET || 'secret', {
            expiresIn: process.env.JWT_EXPIRATION,
        });
    }
    static verifyJwtToken(token) {
        try {
            return jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || 'secret');
        }
        catch (error) {
            return null;
        }
    }
    static hashPassword(password) {
        const saltRounds = 10;
        return bcrypt_1.default.hashSync(password, saltRounds);
    }
    static comparePassword(password, hash) {
        return bcrypt_1.default.compareSync(password, hash);
    }
}
exports.default = JwtUtils;
