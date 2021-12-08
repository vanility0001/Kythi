import "dotenv/config";
import axios from "axios";
import { fileURLToPath } from "url";
import { join, dirname } from "path";
import { SapphireClient, container } from "@sapphire/framework";

const client = new SapphireClient({
  intents: ["GUILDS"],
});
container.stores
  .get("commands")
  .registerPath(join(dirname(fileURLToPath(import.meta.url)), "Commands"));

client.on("ready", () => {
  console.log("Ready!");

  if (process.env.NODE_ENV === "production") {
    void axios.post(process.env.DOCKER_STARTUP_WEBHOOK_URL, {
      username: "Docker Logs",
      avatar_url:
        "https://cdn.discordapp.com/attachments/803816121047318529/915951319527874600/docker_facebook_share.png",
      content: "Bot is up and running on docker!",
    });
  }
});

client.login();
