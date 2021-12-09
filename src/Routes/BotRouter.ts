import type {FastifyInstance} from 'fastify';
import Joi from 'joi';
import {isAuthorized} from '../Middlewares/BotMiddlewares';
import {Invite} from '../Models/Invite';
import {User} from '../Models/User';

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
          return reply.code(404).send({
            statusCode: 404,
            error: 'Not Found',
            message: 'Unknown User',
          });
        }

        const invites = [];

        for (let i = 0; i < request.body.count; i++) {
          const invite = new Invite();
          invite.createdBy = user._id;
          await invite.save();

          invites.push(invite._id);
        }

        return {statusCode: 200, invites};
      },
  );
}

export const autoPrefix = '/bot';
