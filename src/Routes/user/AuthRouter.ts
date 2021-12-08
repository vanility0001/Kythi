import Joi from "joi";
import { v5 } from "uuid";
import { hash } from "argon2";
import passport from "fastify-passport";
import { User } from "../../Models/User";
import { Invite } from "../../Models/Invite";
import type { FastifyInstance } from "fastify";
import { sendVerifyMail } from "../../Utility/Mail";
import { generateRandomString } from "../../Utility";
import { allowedMails } from "../../Utility/Constants";

interface registerBody {
  username: string;
  email: string;
  password: string;
  inviteCode: string;
}

export default async function AuthRouter(fastify: FastifyInstance) {
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
          inviteCode: Joi.string().required(),
        }),
      },
    },
    async (request, reply) => {
      const { username, email, password } = request.body;
      const inviteUsed: Invite = await Invite.findById(request.body.inviteCode);
      const inviter: User = await User.findById(inviteUsed?.createdBy);

      if (!inviteUsed || !inviter) {
        return reply.code(400).send({
          error: "Invalid Invite Code",
        });
      }

      if (!allowedMails.includes(email.split("@")[1])) {
        return reply.code(400).send({
          error:
            "Your email domain is unsupported. Try again with another email.",
        });
      }

      if (
        await User.findOne({
          $or: [
            { username: new RegExp(`^${username}$`, "i") },
            { email: new RegExp(`^${email}$`, "i") },
          ],
        })
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
      user.invite.invitedBy = inviter._id;
      user.verificationCode = generateRandomString(32);
      sendVerifyMail(user);
      await user.save();

      inviter.invite.invited.push(user._id);
      await inviteUsed.remove();
      await inviter.save();

      return {
        message:
          "Successfully registered, Check your email for your verification link",
      };
    }
  );

  fastify.post(
    "/login",
    {
      schema: {
        body: Joi.object().keys({
          username: Joi.string().required(),
          password: Joi.string().required(),
        }),
      },
      preHandler: passport.authenticate("local"),
    },
    async (request, reply) => {
      const user = request.user as User;

      if (!user.verified || !user.verifiedAt) {
        return reply.code(400).send({
          error: "Please verify your email first",
        });
      }

      return {
        message: "Successfully logged in",
        user,
      };
    }
  );
}

export const autoPrefix = "/auth";
