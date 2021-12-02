import type { FastifyInstance } from "fastify";

export default async function BaseRouter(fastify: FastifyInstance) {
  fastify.get("/", async () => {
    return { message: "Hello World"};
  });
}

export const autoPrefix = "/"