import UserModel from '../models/userModel';
import { FastifyRequest, FastifyReply } from 'fastify';
import crypto from '../utils/crypto';
import UserInterface from '../interfaces/UserInterface';
import AccountInterface from '../interfaces/UserInterface';

interface UserRequest {
  name: string;
  email: string;
  phone: string;
  password: string;
  accounts: AccountInterface[];
}

class UserController {
  userModel = new UserModel();

  getUsers = async (request: FastifyRequest, response: FastifyReply) => {
    try {
      const users = await this.userModel.findAll();

      if (!users) return;
      response.send(
        users.map((user) => ({
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          accounts: user.accounts.map((account) => {
            return {
              ...account,
              password: crypto.decryptPassword(account.password.split(',')[0], account.password.split(',')[1]),
            };
          }),
        }))
      );
    } catch (error) {
      return response.status(500).send(error);
    }
  };

  createUser = async (request: FastifyRequest, response: FastifyReply) => {
    const { name, email, phone, password } = request.body as UserRequest;
    const { encryptedPassword, iv } = crypto.encryptPassword(password);
    try {
      const user = await this.userModel.create({
        name,
        email,
        phone,
        password: `${encryptedPassword},${iv}`,
      });
      return response.send({ id: user.id, name: user.name, email: user.email });
    } catch (error) {
      return response.status(500).send(error);
    }
  };
}

const userController = new UserController();

export const getUsers = userController.getUsers;
export const createUser = userController.createUser;
