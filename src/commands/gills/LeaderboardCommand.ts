import { Client, CommandInteraction, SlashCommandBuilder } from "discord.js";
import ICommand from "../../interfaces/ICommand";
import { User } from "../../entity/User";

const command: ICommand = {
    cooldown: 5,
    data: new SlashCommandBuilder()
        .setName("leaderboard")
        .setDescription("Replies with the gills leaderboard."),
    async execute(interaction: CommandInteraction) {
        await interaction.deferReply();

        const discordUser = interaction.user;
        //var user = await findUser(discordUser.id);
        const allUsers = await User.find();
        var leaderboard = "";
        var i = 1;
        allUsers.sort((a, b) => b.gillAmount - a.gillAmount);
        allUsers.forEach(user => {
            leaderboard += `${i}. ${user.discordUsername} - ${user.gillAmount} gills\n`;
            i++;
        });
        await interaction.editReply(`**Gills Leaderboard**\n${leaderboard}`);

        //await interaction.editReply(`You currently have ${user.gillAmount} gills.`);
    }
}

export default command;