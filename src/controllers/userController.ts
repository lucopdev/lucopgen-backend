import JwtUtils from '../utils/jwtUtils';
import UserModel from '../models/userModel';
import { FastifyRequest, FastifyReply } from 'fastify';

interface UserRequest {
  name: string;
  email: string;
  phone: string;
  password: string;
}

class UserController {
  userModel = new UserModel();

  getUsers = async (request: FastifyRequest, response: FastifyReply) => {
    try {
      const users = await this.userModel.findAll();
      response.send(
        users.map((user) => ({
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          accounts: user.accounts,
        }))
      );
    } catch (error) {
      return response.status(500).send(error);
    }
  };

  createUser = async (request: FastifyRequest, response: FastifyReply) => {
    const { name, email, phone, password } = request.body as UserRequest;

    try {
      const user = await this.userModel.create({ name, email, phone, password: JwtUtils.hashPassword(password) });
      return response.send({ id: user.id, name: user.name, email: user.email });
    } catch (error) {
      return response.status(500).send(error);
    }
  };
}

const userController = new UserController();

export const getUsers = userController.getUsers;
export const createUser = userController.createUser;
