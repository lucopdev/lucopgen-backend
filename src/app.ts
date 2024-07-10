import { FastifyInstance } from 'fastify';
import userRoutes from './routes/userRoutes';
import accountRoutes from './routes/accountRoutes';

const app = async (fastify: FastifyInstance) => {
  fastify.get('/', async (request, reply) => {
    reply.send('Hello World!');
  });

  fastify.register(userRoutes, { prefix: '/users' });
  fastify.register(accountRoutes, { prefix: '/accounts' });
};

export default app;
