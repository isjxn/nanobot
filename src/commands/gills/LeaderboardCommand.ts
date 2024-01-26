import { Client, CommandInteraction, EmbedBuilder, SlashCommandBuilder } from "discord.js";
import ICommand from "../../interfaces/ICommand";
import { User } from "../../entity/User";
import capitalizeFirstLetter from "../../utils/capitalizeFirstLetter";

const command: ICommand = {
    cooldown: 5,
    data: new SlashCommandBuilder()
        .setName("leaderboard")
        .setDescription("Replies with the gills leaderboard."),
    async execute(interaction: CommandInteraction) {
        await interaction.deferReply();

        const discordUser = interaction.user;
        const allUsers = await User.find();
        var leaderboard = "";
        var i = 1;

        allUsers.sort((a, b) => b.gillAmount - a.gillAmount);
        allUsers.forEach(user => {
            leaderboard += `${i}. ${user.discordUsername} - ${user.gillAmount} Gills\n`;
            i++;
        });

        const embed = new EmbedBuilder()
            .setColor("#3498db")
            .setTitle(`🏆 Gills - Leaderboard`)
            .setDescription(leaderboard)
            .setTimestamp();

        return await interaction.editReply({ embeds: [embed] });
    }
}

export default command;