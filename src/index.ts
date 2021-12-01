import "dotenv/config";
import fastify from "fastify";

const server = fastify();

const requiredEnvs = ["PORT"];
if (requiredEnvs.some((env) => !process.env[env])) {
  throw new Error(
    `Missing required environment variables: ${requiredEnvs.join(", ")}`
  );
}

server.get("/", async () => {
  return { message: "Hello World!" };
});

server.listen(process.env.PORT, "127.0.0.1", (err) => {
  if (err) throw err;

  console.log(`Listening on http://127.0.0.1:${process.env.PORT}/`);
});
