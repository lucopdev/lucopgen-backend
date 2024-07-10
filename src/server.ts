import Fastify from 'fastify';
import app from './app';

const fastify = Fastify();
const port = 30000;

const start = async () => {
  try {
    await app(fastify);

    await fastify.listen({ port });
    console.log(`Server listening on port ${port}`);
  } catch (error) {
    console.error('Error starting server:', error);
    process.exit(1);
  }
};

start();
