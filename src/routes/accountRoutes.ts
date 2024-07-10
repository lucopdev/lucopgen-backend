import { FastifyInstance } from 'fastify';
import { getAccounts, createAccount } from '../controllers/accountController';

const accountRoutes = async (fastify: FastifyInstance) => {
  fastify.get('/', getAccounts);
  fastify.post('/', createAccount);
};

export default accountRoutes;
