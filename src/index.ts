import "dotenv/config";
import axios from "axios";
import { join } from "path";
import fastify from "fastify";

const server = fastify();

const requiredEnvs = ["PORT", "DOCKER_STARTUP_WEBHOOK_URL"];
if (requiredEnvs.some((env) => !process.env[env])) {
  throw new Error(
    `Missing required environment variables: ${requiredEnvs.join(", ")}`
  );
}

server.register(require("fastify-autoload"), {
  dir: join(__dirname, "routes"),
});

server.listen(process.env.PORT, "0.0.0.0", (err) => {
  if (err) throw err;

  if (process.env.NODE_ENV === "production") {
    void axios.post(process.env.DOCKER_STARTUP_WEBHOOK_URL, {
      username: "Docker Logs",
      avatar_url: "https://cdn.discordapp.com/attachments/803816121047318529/915951319527874600/docker_facebook_share.png",
      content: "Started on docker container"
    })
  }

  console.log(`Listening on http://127.0.0.1:${process.env.PORT}/`);
});
