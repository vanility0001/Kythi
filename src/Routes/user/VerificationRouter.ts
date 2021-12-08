import type {FastifyInstance} from 'fastify';
import {User} from '../../Models/User';

interface verifyParams {
  verificationCode: string;
}

/**
  The Router
  @param {FastifyInstance} fastify
*/
export default async function VerificationRouter(fastify: FastifyInstance) {
  fastify.get<{ Params: verifyParams }>(
      '/:verificationCode',
      async (request, reply) => {
        const {verificationCode} = request.params;
        const verifyingUser: User = await User.findOne({verificationCode});

        if (!verifyingUser) {
          reply.code(400).send({
            message: 'Unknown Verification Code',
          });
        }

        await verifyingUser.updateOne({
          verified: true,
          verifiedAt: new Date(),
          $unset: {verificationCode: ''},
        });

        return 'Successfully Verified!';
      }
  );
}

export const autoPrefix = '/verify';
