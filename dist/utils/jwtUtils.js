"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class JwtUtils {
    static generateJwtToken(payload) {
        const secret = process.env.JWT_SECRET || 'secret';
        const expiration = process.env.JWT_EXPIRATION || '1m';
        return jsonwebtoken_1.default.sign(payload, secret, {
            expiresIn: expiration,
        });
    }
    static generateRefreshToken(payload) {
        const secret = process.env.JWT_REFRESH_SECRET || 'refresh_secret';
        const expiration = process.env.JWT_REFRESH_EXPIRATION || '7d';
        return jsonwebtoken_1.default.sign(payload, secret, {
            expiresIn: expiration,
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
    static verifyRefreshToken(token) {
        try {
            return jsonwebtoken_1.default.verify(token, process.env.JWT_REFRESH_SECRET || 'refresh_secret');
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
