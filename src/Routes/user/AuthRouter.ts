import Joi from "joi";
import { v5 } from "uuid";
import { hash } from "argon2";
import { User } from "../../Models/User";
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
        body: Joi.object().keys({
          username: Joi.string()
            .required()
            .min(4)
            .max(24)
            .pattern(/^[a-zA-Z0-9_]+$/),
          email: Joi.string().required().email().lowercase(),
          password: Joi.string().required(),
        }),
      },
    },
    async (request, reply) => {
      const { username, email, password } = request.body;

      if (email.split("@")[1] !== "gmail.com") {
        return reply
          .code(400)
          .send({ error: "Only emails registered under gmail is supported" });
      }

      if (await User.findOne({ $or: [{ username }, { email }] })
      ) {
        return reply.code(400).send({
          error: `The username or email is already taken`,
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
