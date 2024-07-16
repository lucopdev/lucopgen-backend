"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.onLogin = void 0;
const prisma_1 = __importDefault(require("../prisma"));
const jwtUtils_1 = __importDefault(require("../utils/jwtUtils"));
const crypto_1 = __importDefault(require("../utils/crypto"));
class LoginController {
    constructor() {
        this.onLogin = async (request, reply) => {
            const { email, password } = request.body;
            if (!email || !password) {
                return reply.code(400).send({ message: 'Email and password are required' });
            }
            const user = await prisma_1.default.user.findUnique({
                where: {
                    email,
                },
            });
            if (!user) {
                return reply.code(404).send({ message: 'User not found' });
            }
            const isPasswordValid = crypto_1.default.comparePassword(password, user.password.split(',')[0], user.password.split(',')[1]);
            if (!isPasswordValid) {
                return reply.code(401).send({ message: 'Invalid password' });
            }
            const token = jwtUtils_1.default.generateJwtToken({ email });
            const bearerToken = `Bearer ${token}`;
            return reply.send({ token: bearerToken, type: 'Bearer' });
        };
    }
}
const loginController = new LoginController();
exports.onLogin = loginController.onLogin;
