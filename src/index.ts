import "dotenv/config";
import { Client } from "discord.js";

const client = new Client({
    intents: ["GUILDS", "GUILD_MESSAGES"]
});

client.on("ready", () => {
    console.log("Ready!");
})

client.on("messageCreate", (message) => {
    if (message.content === "!ping") {
        message.reply("pong");
    }
})

client.login()