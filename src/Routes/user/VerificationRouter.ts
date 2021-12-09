import {User} from '../../Models/User';
import {sendReply} from '../../Utility';
import type {FastifyInstance} from 'fastify';

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
          return sendReply(reply, 400, 'Invalid verification code');
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
