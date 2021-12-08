import { Message, CommandInteraction, MessageEmbed } from "discord.js";
import { Command, RegisterBehavior } from "@sapphire/framework";

export default class PingCommand extends Command {
  constructor(context: Command.Context, options: Command.Options) {
    super(context, {
      ...options,
      name: "ping",
      description: "🏓 Ponged!",
      chatInputCommand: {
        register: true,
        guildIds: ["915315221202104332"],
        idHints: ["917939655138230323"],
        behaviorWhenNotIdentical: RegisterBehavior.LogToConsole,
      },
    });
  }

  public async chatInputRun(interaction: CommandInteraction) {
    const msg = (await interaction.reply({
      content: "Ping?",
      fetchReply: true,
    })) as Message<true>;

    const embed = new MessageEmbed()
      .setColor("#0099ff")
      .setTitle("🏓 Pong!")
      .setDescription(
        `Bot Latency: ${
          msg.createdTimestamp - interaction.createdTimestamp
        }ms\nAPI Latency: ${Math.round(this.container.client.ws.ping)}ms`
      )
      .setFooter("Seriously was this command really needed?");

    return interaction.editReply({ content: null, embeds: [embed] });
  }
}
