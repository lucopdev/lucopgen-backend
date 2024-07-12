// src/types/fastify.d.ts

import 'fastify';
import { JwtPayload } from './utils/jwtUtils';

// Extende a interface FastifyRequest
declare module 'fastify' {
  interface FastifyRequest {
    user?: JwtPayload;  // Adiciona a propriedade 'user' para armazenar o payload do token JWT
  }
}
