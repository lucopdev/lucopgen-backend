import AccountModel from '../models/accountModel';
import { FastifyRequest, FastifyReply } from 'fastify';

interface AccountRequest {
  login: string;
  password: string;
  name: string;
  ownerId: number;
}

class AccountController {
  accountModel = new AccountModel();

  getAccounts = async (request: FastifyRequest, response: FastifyReply) => {
    try {
      const accounts = await this.accountModel.findAll();
      return response.send(accounts);
    } catch (error) {
      return response.status(500).send(error);
    }
  };

  createAccount = async (request: FastifyRequest, response: FastifyReply) => {
    const { login, password, name, ownerId } = request.body as AccountRequest;

    try {
      const account = await this.accountModel.create({ login, password, name, ownerId: Number(ownerId) });
      return response.send(account);
    } catch (error) {
      return response.status(500).send(error);
    }
  };

  deleteAccount = async (request: FastifyRequest, response: FastifyReply) => {
    const { userId, id } = request.params as { userId: string; id: string };
    
    try {
      const account = await this.accountModel.findById(Number(id));

      if (userId !== account?.ownerId.toString()) {
        return response.status(401).send({ message: 'Unauthorized' });
      }

      await this.accountModel.delete(Number(id));
      return response.send({ message: 'Account deleted' });
    } catch (error) {
      return response.status(500).send(error);
    }
  };
}

const accountController = new AccountController();

export const getAccounts = accountController.getAccounts;
export const createAccount = accountController.createAccount;
export const deleteAccount = accountController.deleteAccount;
