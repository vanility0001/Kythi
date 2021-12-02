namespace NodeJS {
  interface ProcessEnv {
    PORT: string;
    NODE_ENV: 'development' | 'production';
    DOCKER_STARTUP_WEBHOOK_URL: string;
  }
}
