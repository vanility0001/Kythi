import "dotenv/config";
import { join } from "path";
import fastify from "fastify";
import { connect } from "mongoose";
import { request } from "./Utility"; 

const server = fastify();

const requiredEnvs = ["PORT", "MONGO_URI", "DOCKER_STARTUP_WEBHOOK_URL"];
if (requiredEnvs.some((env) => !process.env[env])) {
  throw new Error(
    `Missing required environment variables: ${requiredEnvs.join(", ")}`
  );
}

server.register(require("fastify-autoload"), {
  dir: join(__dirname, "Routes"),
});

server.setValidatorCompiler(({ schema }) => {
  return data => schema.validate!(data);
})

server.listen(process.env.PORT, "0.0.0.0", (err) => {
  if (err) throw err;

  console.log(`Listening on http://127.0.0.1:${process.env.PORT}/`);

  connect(process.env.MONGO_URI, { keepAlive: true }, (err) => {
    if (err) throw err;

    console.log("Connected to MongoDB");
  });

  if (process.env.NODE_ENV === "production") {
    void request(process.env.DOCKER_STARTUP_WEBHOOK_URL, "POST", {
      body: {
        username: "Docker Logs",
        avatar_url:
          "https://cdn.discordapp.com/attachments/803816121047318529/915951319527874600/docker_facebook_share.png",
        content: "Started on docker container",
      }
    });
  }
});
