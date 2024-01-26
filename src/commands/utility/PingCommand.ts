import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import ICommand from "../../interfaces/ICommand";

const command: ICommand = {
    cooldown: 5,
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Replies with Pong! (2)"),
    execute(interaction: CommandInteraction) {
        interaction.reply("Pong!");
    }
}

export default command;