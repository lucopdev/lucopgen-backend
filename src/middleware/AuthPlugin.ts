import { FastifyPluginCallback } from 'fastify';
import JwtUtils from '../utils/jwtUtils';

const authPlugin: FastifyPluginCallback = (fastify, options, done) => {
  fastify.addHook('onRequest', async (request, reply) => {
    try {
      const authHeader = request.headers.authorization;
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        reply.code(401).send({ message: 'Authorization header missing or invalid' });
        return;
      }

      const token = authHeader.split(' ')[1];
      const payload = JwtUtils.verifyJwtToken(token);

      if (!payload) {
        reply.code(401).send({ message: 'Invalid or expired token' });
        return;
      }

      request.user = payload;  // Adiciona o payload ao request para uso posterior
    } catch (error) {
      reply.code(401).send({ message: 'Unauthorized' });
    }
  });

  done();
};

export default authPlugin;
