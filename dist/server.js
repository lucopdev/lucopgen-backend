"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const app_1 = __importDefault(require("./app"));
const fastify = (0, fastify_1.default)();
const port = 30000;
const start = async () => {
    try {
        await (0, app_1.default)(fastify);
        await fastify.listen({ port });
        console.log(`Server listening on port ${port}`);
    }
    catch (error) {
        console.error('Error starting server:', error);
        process.exit(1);
    }
};
start();
