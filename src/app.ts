import { FastifyInstance } from 'fastify';
import FastifyCors from '@fastify/cors'; // Atualize a importação
import userRoutes from './routes/userRoutes';
import accountRoutes from './routes/accountRoutes';

const app = async (fastify: FastifyInstance) => {
  fastify.register(FastifyCors, {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });

  fastify.get('/', async (request, reply) => {
    reply.send('Hello World!');
  });

  fastify.register(userRoutes, { prefix: '/users' });
  fastify.register(accountRoutes, { prefix: '/accounts' });
};

export default app;
