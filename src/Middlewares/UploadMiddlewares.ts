import {User} from '../Models/User';
import {FastifyRequest, FastifyReply} from 'fastify';

/**
  Checks if the upload key provided is valid
  @param {FastifyRequest} request
  @param {FastifyReply} reply
*/
export async function verifyUser(request: FastifyRequest, reply: FastifyReply) {
  if (!request.headers.authorization) {
    return reply.status(401).send({message: 'No upload key provided'});
  }

  const user = await User.findOne({
    'upload.key': request.headers.authorization,
  });

  if (!user) return reply.status(401).send({message: 'Invalid upload key'});

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
    return reply.status(401).send({message: 'No file provided'});
  }
}
