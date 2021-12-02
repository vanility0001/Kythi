namespace NodeJS {
  interface ProcessEnv {
    PORT: string;
    MONGO_URI: string;
    DOCKER_STARTUP_WEBHOOK_URL: string;
    NODE_ENV: 'development' | 'production';
  }
}
