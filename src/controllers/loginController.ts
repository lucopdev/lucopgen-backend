import { FastifyReply, FastifyRequest } from 'fastify';
import prisma from '../prisma';
import JwtUtils from '../utils/jwtUtils';
import crypto from '../utils/crypto';

interface LoginRequest {
  email: string;
  password: string;
}

class LoginController {
  onLogin = async (request: FastifyRequest, reply: FastifyReply) => {
    const { email, password } = request.body as LoginRequest;

    if (!email || !password) {
      return reply.code(400).send({ message: 'Email and password are required' });
    }

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      return reply.code(404).send({ message: 'User not found' });
    }
    
    const isPasswordValid = crypto.comparePassword(password, user.password.split(',')[0], user.password.split(',')[1]);

    if (!isPasswordValid) {
      return reply.code(401).send({ message: 'Invalid password' });
    }

    const token = JwtUtils.generateJwtToken({ email });
    const bearerToken = `Bearer ${token}`;
    return reply.send({ token: bearerToken, type: 'Bearer' });
  };
}

const loginController = new LoginController();

export const onLogin = loginController.onLogin;
