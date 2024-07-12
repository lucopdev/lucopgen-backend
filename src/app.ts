import { FastifyInstance } from 'fastify';
import FastifyCors from '@fastify/cors'; // Atualize a importação
import userRoutes from './routes/userRoutes';
import accountRoutes from './routes/accountRoutes';
import loginRoutes from './routes/loginRoutes';

const app = async (fastify: FastifyInstance) => {
  fastify.register(FastifyCors, {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });

  fastify.get('/', async (request, reply) => {
    reply.send('Welcome to lucopgen API');
  });
  
  fastify.register(loginRoutes, { prefix: '/login' });
  fastify.register(userRoutes, { prefix: '/users' });
  fastify.register(accountRoutes, { prefix: '/accounts' });
};

export default app;
