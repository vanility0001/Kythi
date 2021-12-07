import "dotenv/config";
import axios from "axios";
import { Client } from "discord.js";

const client = new Client({
  intents: ["GUILDS", "GUILD_MESSAGES"],
});

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

client.on("messageCreate", (message) => {
  if (message.content === "!ping") {
    message.reply("pong");
  }
});

client.login();
