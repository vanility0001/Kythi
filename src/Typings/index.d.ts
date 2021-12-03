import { User } from "../Models/User";
import { File } from "fastify-multer/lib/interfaces"
import { FastifySchema, FastifyRequest } from "fastify";


declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      HOST: string;
      S3_INFO: string;
      MONGO_URI: string;
      S3_BUCKET: string;
      MAIL_INFO: string;
      DOCKER_STARTUP_WEBHOOK_URL: string;
      NODE_ENV: "development" | "production";
    }
  }
}

declare module "fastify" {
  interface FastifySchema extends FastifySchema {
    validate?: (any) => any;
  }

  interface FastifyRequest extends FastifyRequest {
    user?: User;
    file?: File;
  }
}
