import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import ICommand from "../../interfaces/ICommand";
import findUser from "../../utils/findUser";

const command: ICommand = {
    cooldown: 5,
    data: new SlashCommandBuilder()
        .setName("balance")
        .setDescription("Replies with your current gills balance."),
    async execute(interaction: CommandInteraction) {
        await interaction.deferReply();

        const discordUser = interaction.user;
        var user = await findUser(discordUser.id, discordUser.globalName);

        await interaction.editReply(`You currently have ${user.gillAmount} gills.`);
    }
}

export default command;