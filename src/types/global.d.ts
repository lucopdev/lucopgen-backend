declare module 'fastify-jwt' {
  import { FastifyPluginCallback } from 'fastify';

  interface FastifyJwtOptions {
    secret: string;
    sign?: object;
    verify?: object;
  }

  interface FastifyJwt {
    sign: (payload: object, options?: object) => string;
    verify: (token: string, options?: object) => object | null;
  }

  const fastifyJwt: FastifyPluginCallback<FastifyJwtOptions>;
  export default fastifyJwt;
}
