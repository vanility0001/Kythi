import type {FastifyInstance} from 'fastify';

/**
  The Router
  @param {FastifyInstance} fastify
*/
export default async function BaseRouter(fastify: FastifyInstance) {
  fastify.get('/', async () => {
    return {message: 'Hello World'};
  });
}

export const autoPrefix = '/';
