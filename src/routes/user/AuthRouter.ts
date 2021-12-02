import { v5 } from "uuid";
import { hash } from "argon2";
import { User } from "../../models/user";
import type { FastifyInstance } from "fastify";

interface registerBody {
  username: string;
  email: string;
  password: string;
}

export default async function BaseRouter(fastify: FastifyInstance) {
  fastify.post<{ Body: registerBody }>(
    "/register",
    {
      schema: {
        body: {
          type: "object",
          properties: {
            username: {
              type: "string",
              min: 4,
              max: 24,
              pattern: "^[a-zA-Z0-9_]+$",
            },
            email: { type: "string", format: "email" },
            password: { type: "string" },
          },
          required: ["email", "password", "username"],
        },
      },
    },
    async (request, reply) => {
      const { username, email, password } = request.body;

      if (email.split("@")[1].split(".")[0].toLowerCase() !== "gmail") {
        return reply.code(400).send(
            { error: "Only emails registered under gmail is supported" }
        );
      }

      if (await User.findOne({ $or: [{username}, {email: email.toLowerCase()}] })) {
        return reply.code(400).send({
          error: `An account with the username ${username} or email ${email} already exists`,
        });
      }

      const user = new User();
      user._id = v5(username, v5.DNS);
      user.username = username;
      user.email = email;
      user.password = await hash(password);
      await user.save();

      return {
        message: "Successfully registered",
      };
    }
  );
}

export const autoPrefix = "/auth";
