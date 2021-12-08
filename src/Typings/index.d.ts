import {User} from '../Models/User';
import {File} from 'fastify-multer/lib/interfaces';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      HOST: string;
      CDN_URL: string;
      S3_INFO: string;
      NODE_ENV: 'development' | 'production';
      S3_BUCKET: string;
      MONGO_URI: string;
      MAIL_INFO: string;
      COOKIE_KEY: string;
      DOCKER_STARTUP_WEBHOOK_URL: string;
    }
  }

  interface Embed {
    color: string;
    title: string;
    description: string;
    author: {
      text: string;
      url: string;
    };
    site: {
      text: string;
      url: string;
    };
  }
}

declare module 'fastify' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface PassportUser extends User {}
  interface FastifySchema extends FastifySchema {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- This is undocumented
    validate?: (any) => any;
  }

  interface FastifyRequest extends FastifyRequest {
    user?: User;
    file?: File;
  }
}
