import { FastifyInstance } from 'fastify';
import { getAccounts, createAccount, deleteAccount } from '../controllers/accountController';

const accountRoutes = async (fastify: FastifyInstance) => {
  fastify.get('/', getAccounts);
  fastify.post('/', createAccount);
  fastify.delete('/:userId/:id', deleteAccount);
};

export default accountRoutes;
