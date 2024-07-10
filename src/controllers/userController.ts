import UserModel from '../models/userModel';
import { FastifyRequest, FastifyReply } from 'fastify';

class UserController {
  userModel = new UserModel();

  getUsers = async (request: FastifyRequest, response: FastifyReply) => {
    try {
      const users = await this.userModel.findAll();
      response.send(users);
    } catch (error) {
      response.status(500).send(error);
    }
  };

  createUser = async (request: FastifyRequest, response: FastifyReply) => {
    const { email, password, name } = request.body as { email: string; password: string; name: string };

    try {
      const user = await this.userModel.create({ email, password, name });
      response.send(user);
    } catch (error) {
      response.status(500).send(error);
    }
  };
}

const userController = new UserController();

export const getUsers = userController.getUsers;
export const createUser = userController.createUser;
