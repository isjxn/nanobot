import { CommandInteraction, EmbedBuilder, SlashCommandBuilder } from "discord.js";
import ICommand from "../../interfaces/ICommand";
import findUser from "../../utils/findUser";

const command: ICommand = {
    cooldown: 5,
    data: new SlashCommandBuilder()
        .setName("daily")
        .setDescription("Claims a daily amount of gills."),
    async execute(interaction: CommandInteraction) {
        await interaction.deferReply();

        const discordUser = interaction.user;
        var user = await findUser(discordUser.id, discordUser.globalName);

        // Check if user has already claimed their daily in the last 24 hours
        const now = new Date();
        const lastDaily = new Date(user.lastDaily);
        const diff = Math.abs(now.getTime() - lastDaily.getTime());
        const diffHours = Math.ceil(diff / (1000 * 60 * 60));
        if (diffHours < 24) {
            const embed = new EmbedBuilder()
                .setColor("#e74c3c")
                .setTitle("❌ Daily Claim - Error")
                .setDescription(`You can claim your next daily in **${24 - diffHours}** hours.`)
                .setTimestamp();

            await interaction.editReply({ embeds: [embed] });
            return;
        }

        // Add daily amount to user's balance
        user.gillAmount += 100;
        user.lastDaily = new Date();
        await user.save();

        const embed = new EmbedBuilder()
            .setColor("#3498db")
            .setTitle("✅💰 Daily Claim - Success")
            .setDescription(`You have claimed your daily of **100** 🪙 Gills!`)
            .setTimestamp();

        await interaction.editReply({ embeds: [embed] });
    }
}

export default command;