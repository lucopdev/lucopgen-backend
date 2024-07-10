import { FastifyInstance } from 'fastify';
import { getUsers, createUser } from '../controllers/userController';

const userRoutes = async (fastify: FastifyInstance) => {
  fastify.get('/', getUsers);
  fastify.post('/', createUser);
};

export default userRoutes;
