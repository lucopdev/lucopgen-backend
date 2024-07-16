import AccountModel from '../models/accountModel';
import { FastifyRequest, FastifyReply } from 'fastify';
import crypto from '../utils/crypto';

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
      const uncryptedPasswordAccounts = accounts.map((account) => {
        return {
          ...account,
          password: `${crypto.decryptPassword(account.password.split(',')[0], account.password.split(',')[1])}`,
        };
      });

      return response.send(uncryptedPasswordAccounts);
    } catch (error) {
      return response.status(500).send(error);
    }
  };

  createAccount = async (request: FastifyRequest, response: FastifyReply) => {
    const { login, password, name, ownerId } = request.body as AccountRequest;
    const { encryptedPassword, iv } = crypto.encryptPassword(password);

    try {
      const account = await this.accountModel.create({
        login,
        password: `${encryptedPassword},${iv}`,
        name,
        ownerId: Number(ownerId),
      });
      return response.send(account);
    } catch (error) {
      return response.status(500).send(error);
    }
  };

  deleteAccount = async (request: FastifyRequest, response: FastifyReply) => {
    const { userId, id } = request.params as { userId: string; id: string };

    try {
      const account = await this.accountModel.findById(Number(id));
      if (!account) {
        return response.status(404).send({ message: 'Account not found.' });
      }

      if (userId !== account?.ownerId.toString()) {
        return response.status(401).send({ message: 'Unauthorized' });
      }

      await this.accountModel.delete(Number(id));

      const deletedAccount = await this.accountModel.findById(Number(id));
      if (deletedAccount) {
        return response.status(500).send({ message: 'Failed to delete account' });
      }

      return response.status(200).send({ message: 'Account deleted successfully' });
    } catch (error) {
      return response.status(500).send({ error, message: 'Lucopgen internal failiure' });
    }
  };
}

const accountController = new AccountController();

export const getAccounts = accountController.getAccounts;
export const createAccount = accountController.createAccount;
export const deleteAccount = accountController.deleteAccount;
