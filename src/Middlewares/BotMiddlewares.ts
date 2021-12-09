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
  if (
    !request.headers.authorization ||
    request.headers.authorization !== process.env.BOT_API_KEY
  ) {
    return reply
        .status(401)
        .send({statusCode: 400, error: 'Bad Request', message: 'Invalid API Key'});
  }
}
