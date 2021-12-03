import "dotenv/config";
import { join } from "path";
import fastify from "fastify";
import { connect } from "mongoose";
import { request } from "./Utility"; 

const server = fastify({
  trustProxy: true,
});

server.setValidatorCompiler(({ schema }) => {
  return data => schema.validate!(data);
});

server.setNotFoundHandler((_, reply) => {
  return reply.code(404).send("Thats a Four Oh Four. We couldn't find that endpoint.")
})

server.register(require("fastify-multer").contentParser);
server.register(require("fastify-helmet"));

server.register(require('fastify-cors'), {
  origin: [/^http:\/\/localhost:\d{0,4}$/, "https://www.kythi.com"],
  credentials: true,
});

server.register(require("fastify-rate-limit"), {
  timeWindow: 1000,
  max: 2,
});

server.register(require("fastify-autoload"), {
  dir: join(__dirname, "Routes"),
});

server.listen(process.env.PORT, "0.0.0.0", (err) => {
  if (err) throw err;

  connect(process.env.MONGO_URI, { keepAlive: true }, (err) => {
    if (err) throw err;
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

  console.log(`Listening on http://127.0.0.1:${process.env.PORT}/`);
  console.log("Connected to MongoDB");
});
