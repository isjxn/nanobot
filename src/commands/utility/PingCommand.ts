import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import ICommand from "../../interfaces/ICommand";

const command: ICommand = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Replies with Pong!"),
    execute(interaction: CommandInteraction) {
        interaction.reply("Pong!");
    }
}

export default command;