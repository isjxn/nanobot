import { CommandInteraction, EmbedBuilder, SlashCommandBuilder } from "discord.js";
import ICommand from "../../interfaces/ICommand";
import findUser from "../../utils/findUser";
import capitalizeFirstLetter from "../../utils/capitalizeFirstLetter";

const command: ICommand = {
    cooldown: 5,
    data: new SlashCommandBuilder()
        .setName("bet")
        .setDescription("Wager gills on whether a number 1-100 is above or below 50.")
        .addStringOption(option =>
            option.setName('higherorlower')
                .setDescription('Whether the number will be higher or lower than 50.')
                .setRequired(true)
                .addChoices(
                    { name: 'Higher', value: 'higher' },
                    { name: 'Lower', value: 'lower' }
                ))
        .addNumberOption(option =>
            option.setName('amount')
                .setDescription('The amount of gills to bet.')
                .setRequired(true)) as SlashCommandBuilder,
    async execute(interaction: CommandInteraction) {
        await interaction.deferReply();

        const discordUser = interaction.user;
        var user = await findUser(discordUser.id, discordUser.globalName);
        const higherOrLower = interaction.options.get('higherorlower', true).value.toString().toLowerCase();
        const amount = interaction.options.get('amount', true).value as number;
        const roll = Math.floor(Math.random() * 100) + 1;

        if (amount > user.gillAmount) {
            const embed = new EmbedBuilder()
                .setColor("#e74c3c")
                .setTitle(`❌ Bet - Error`)
                .setDescription(`You don't have: \`${amount}\` 🪙 Gills!`)
                .setTimestamp();

            return await interaction.editReply({ embeds: [embed] });
        }

        if (amount <= 0) {
            const embed = new EmbedBuilder()
                .setColor("#e74c3c")
                .setTitle(`❌ Bet - Error`)
                .setDescription(`You can't bet: \`${amount}\` 🪙 Gills!`)
                .setTimestamp();

            return await interaction.editReply({ embeds: [embed] });
        }

        // Check if amount is decimal
        if (amount % 1 !== 0) {
            const embed = new EmbedBuilder()
                .setColor("#e74c3c")
                .setTitle(`❌ Bet - Error`)
                .setDescription(`You can't bet: \`${amount}\` 🪙 Gills!`)
                .setTimestamp();

            return await interaction.editReply({ embeds: [embed] });
        }

        if (higherOrLower !== 'higher' && higherOrLower !== 'lower') {
            const embed = new EmbedBuilder()
                .setColor("#e74c3c")
                .setTitle(`❌ Bet - Error`)
                .setDescription(`You can only bet **higher** ⬆️ or **lower** ⬇️`)
                .setTimestamp();

            return await interaction.editReply({ embeds: [embed] });
        }

        if ((higherOrLower === 'higher' && roll >= 50) || (higherOrLower === 'lower' && roll < 50)) {
            user.gillAmount += amount;
            await user.save();

            const embed = new EmbedBuilder()
                .setColor("#f1c40f")
                .setTitle(`✅💰 Bet - You Won!`)
                .setDescription(`You chose: \`${capitalizeFirstLetter(higherOrLower)}\` and rolled a \`${roll}\`! \nYou won: **${amount}** 🪙 Gills!`)
                .setTimestamp();

            return await interaction.editReply({ embeds: [embed] });
        }

        user.gillAmount -= amount;
        await user.save();

        const embed = new EmbedBuilder()
            .setColor("#e74c3c")
            .setTitle(`❌ Bet - You Lost!`)
            .setDescription(`You chose: \`${capitalizeFirstLetter(higherOrLower)}\` and rolled a \`${roll}\`! \nYou lost: **${amount}** 🪙 Gills!`)
            .setTimestamp();

        return await interaction.editReply({ embeds: [embed] });
    }
}

export default command;