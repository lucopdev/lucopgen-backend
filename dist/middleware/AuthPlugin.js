"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwtUtils_1 = __importDefault(require("../utils/jwtUtils"));
const authPlugin = (fastify, options, done) => {
    fastify.addHook('onRequest', async (request, reply) => {
        try {
            const authHeader = request.headers.authorization;
            if (!authHeader || !authHeader.startsWith('Bearer ')) {
                reply.code(401).send({ message: 'Authorization header missing or invalid' });
                return;
            }
            const token = authHeader.split(' ')[1];
            const payload = jwtUtils_1.default.verifyJwtToken(token);
            if (!payload) {
                reply.code(401).send({ message: 'Invalid or expired token' });
                return;
            }
            request.user = payload; // Adiciona o payload ao request para uso posterior
        }
        catch (error) {
            reply.code(401).send({ message: 'Unauthorized' });
        }
    });
    done();
};
exports.default = authPlugin;
