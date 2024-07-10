"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const accountRoutes_1 = __importDefault(require("./routes/accountRoutes"));
const app = async (fastify) => {
    fastify.get('/', async (request, reply) => {
        reply.send('Hello World!');
    });
    fastify.register(userRoutes_1.default, { prefix: '/users' });
    fastify.register(accountRoutes_1.default, { prefix: '/accounts' });
};
exports.default = app;
