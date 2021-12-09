import {sendReply} from '../Utility';
import {FastifyRequest, FastifyReply} from 'fastify';

/**
 * Checks if the api key provided is valid
 * @param {FastifyRequest} request
 * @param {FastifyReply} reply
 * @return {void}
 */
export async function isAuthorized(
    request: FastifyRequest,
    reply: FastifyReply,
) {
  if (!request.headers.authorization) {
    return sendReply(reply, 401, 'No API Key provided.');
  }

  if (request.headers.authorization !== process.env.BOT_API_KEY) {
    return sendReply(reply, 403, 'Invalid API Key.');
  }
}
