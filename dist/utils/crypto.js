"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const algorithm = 'aes-256-cbc';
const secretKey = process.env.CRYPTO_SECRET_KEY;
if (!secretKey) {
    throw new Error('Secret key is not defined in environment variables');
}
const encryptPassword = (password) => {
    const algorithm = 'aes-256-cbc';
    const key = Buffer.from(secretKey, 'hex');
    const iv = crypto_1.default.randomBytes(16);
    const cipher = crypto_1.default.createCipheriv(algorithm, key, iv);
    let encryptedPassword = cipher.update(password, 'utf8', 'hex');
    encryptedPassword += cipher.final('hex');
    return { iv: iv.toString('hex'), encryptedPassword };
};
const decryptPassword = (encryptedPassword, iv) => {
    const key = Buffer.from(secretKey, 'hex');
    const ivBuffer = Buffer.from(iv, 'hex');
    const decipher = crypto_1.default.createDecipheriv(algorithm, key, ivBuffer);
    let decryptedPassword = decipher.update(encryptedPassword, 'hex', 'utf8');
    decryptedPassword += decipher.final('utf8');
    return decryptedPassword;
};
const comparePassword = (providedPassword, encryptedPassword, iv) => {
    const decryptedPassword = decryptPassword(encryptedPassword, iv);
    return providedPassword === decryptedPassword;
};
exports.default = { encryptPassword, decryptPassword, comparePassword };
