namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: "development" | "production";
    DISCORD_TOKEN: string;
    DOCKER_STARTUP_WEBHOOK_URL: string;
  }
}
