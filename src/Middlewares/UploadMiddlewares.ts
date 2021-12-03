import { FastifyRequest, FastifyReply } from "fastify";
import { User } from "../Models/User";

export async function verifyUser(request: FastifyRequest, reply: FastifyReply) {
    if (!request.headers.authorization) return reply.status(401).send({ message: 'No upload key provided' });
    
    const user = await User.findOne({ "upload.key": request.headers.authorization });

    if (!user) return reply.status(401).send({ message: 'Invalid upload key' });

    request.user = user;
    return;
}

export async function verifyFile(request: FastifyRequest, reply: FastifyReply) {
    if (!request.file) return reply.status(401).send({ message: 'No file provided' });

    return;
}