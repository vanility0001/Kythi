import {User} from '../Models/User';
import {sendReply} from '../Utility';
import {FastifyRequest, FastifyReply} from 'fastify';

/**
  Checks if the upload key provided is valid
  @param {FastifyRequest} request
  @param {FastifyReply} reply
*/
export async function verifyUser(request: FastifyRequest, reply: FastifyReply) {
  if (!request.headers.authorization) {
    return sendReply(reply, 401, 'No Upload Key provided');
  }

  const user = await User.findOne({
    'upload.key': request.headers.authorization,
  });

  if (!user) return sendReply(reply, 403, 'Invalid Upload Key');

  request.user = user;
  return;
}

/**
  Checks if a file was provided
  @param {FastifyRequest} request
  @param {FastifyReply} reply
*/
export async function verifyFile(request: FastifyRequest, reply: FastifyReply) {
  if (!request.file || !request.file.buffer) {
    return sendReply(reply, 400, 'No file provided');
  }
}
