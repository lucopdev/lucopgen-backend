import { onLogin } from '../controllers/loginController';
import { FastifyInstance } from 'fastify';

const loginRoutes = async (fastify: FastifyInstance) => {
  fastify.post('/', onLogin);
};

export default loginRoutes;
