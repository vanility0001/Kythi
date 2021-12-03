import multer from "fastify-multer";
import { File } from "../Models/File";
import type { FastifyInstance } from "fastify";
import { generateRandomString } from "../Utility";
import { uploadFile, s3Info } from "../Utility/Storage";
import { verifyFile, verifyUser } from "../Middlewares/UploadMiddlewares";

const upload = multer({
  storage: multer.memoryStorage(),
});

export default async function UploadRouter(fastify: FastifyInstance) {
  fastify.post(
    "/sharex",
    { preHandler: [verifyUser, upload.single("file"), verifyFile] },
    async (request, reply) => {
      const { file: reqFile, user } = request;

      const file = new File();
      file.cdnName = generateRandomString(10) + "." + reqFile!.mimetype.split("/")[1];
      file._id = file.cdnName;
      file.mimeType = reqFile!.mimetype;
      file.size = reqFile!.size;
      file.path = "/";
      file.uploader._id = user!._id;
      file.uploader.username = user!.username;
      await file.save();

      user!.upload.count++;
      await user!.save();

      uploadFile(file, reqFile!.buffer!);

      reply.send({
        imageURL: `https://${s3Info.endpoint}/${process.env.S3_BUCKET}/${
          user!._id
        }/${file.cdnName}`,
      });
    }
  );
}

export const autoPrefix = "/upload";
