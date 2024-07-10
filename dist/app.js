"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("@fastify/cors")); // Atualize a importação
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const accountRoutes_1 = __importDefault(require("./routes/accountRoutes"));
const app = async (fastify) => {
    fastify.register(cors_1.default, {
        origin: '*', // Permite todas as origens. Para produção, substitua '*' por um URL específico ou uma lista de URLs permitidos.
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true, // Permite envio de cookies e outras credenciais
    });
    fastify.get('/', async (request, reply) => {
        reply.send('Hello World!');
    });
    fastify.register(userRoutes_1.default, { prefix: '/users' });
    fastify.register(accountRoutes_1.default, { prefix: '/accounts' });
};
exports.default = app;
