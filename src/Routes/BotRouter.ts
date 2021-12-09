import Joi from 'joi';
import {User} from '../Models/User';
import {sendReply} from '../Utility';
import {Invite} from '../Models/Invite';
import type {FastifyInstance} from 'fastify';
import {isAuthorized} from '../Middlewares/BotMiddlewares';

interface generateInviteBody {
  count: number;
  creator: string;
}

/**
  The Router
  @param {FastifyInstance} fastify
*/
export default async function BotRouter(fastify: FastifyInstance) {
  fastify.post<{Body: generateInviteBody}>(
      '/genInv',
      {
        schema: {
          body: Joi.object().keys({
            creator: Joi.string().required(),
            count: Joi.number().integer().min(1).max(25).required(),
          }),
        },
        preHandler: [isAuthorized],
      },
      async (request, reply) => {
        const user: User = await User.findById(request.body.creator);

        if (!user) {
          return sendReply(reply, 404, 'Unknown user id');
        }

        const invites = [];

        for (let i = 0; i < request.body.count; i++) {
          const invite = new Invite();
          invite.createdBy = user._id;
          await invite.save();

          invites.push(invite._id);
        }

        return sendReply(reply, 200, null, {invites});
      },
  );
}

export const autoPrefix = '/bot';
