"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("@fastify/cors"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const accountRoutes_1 = __importDefault(require("./routes/accountRoutes"));
const loginRoutes_1 = __importDefault(require("./routes/loginRoutes"));
const AuthPlugin_1 = __importDefault(require("./middleware/AuthPlugin"));
const app = async (fastify) => {
    fastify.register(cors_1.default, {
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true,
    });
    fastify.register(AuthPlugin_1.default);
    fastify.get('/', async (request, reply) => {
        reply.send('Welcome to lucopgen API');
    });
    fastify.register(loginRoutes_1.default, { prefix: '/login' });
    fastify.register(userRoutes_1.default, { prefix: '/users' });
    fastify.register(accountRoutes_1.default, { prefix: '/accounts' });
};
exports.default = app;
