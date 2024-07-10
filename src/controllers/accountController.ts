import AccountModel from '../models/accountModel';
import { FastifyRequest, FastifyReply } from 'fastify';

class AccountController {
  accountModel = new AccountModel();

  getAccounts = async (request: FastifyRequest, response: FastifyReply) => {
    try {
      const accounts = await this.accountModel.findAll();
      response.send(accounts);
    } catch (error) {
      response.status(500).send(error);
    }
  };

  createAccount = async (request: FastifyRequest, response: FastifyReply) => {
    const { email, password, name, ownerId } = request.body as { email: string; password: string; name: string, ownerId: number};

    try {
      const account = await this.accountModel.create({ email, password, name, ownerId: Number(ownerId) });
      response.send(account);
    } catch (error) {
      response.status(500).send(error);
    }
  };
}

const accountController = new AccountController();

export const getAccounts = accountController.getAccounts;
export const createAccount = accountController.createAccount;
