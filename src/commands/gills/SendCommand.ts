import { CommandInteraction, EmbedBuilder, SlashCommandBuilder } from "discord.js";
import ICommand from "../../interfaces/ICommand";
import findUser from "../../utils/findUser";

const command: ICommand = {
    cooldown: 5,
    data: new SlashCommandBuilder()
        .setName("send")
        .setDescription("Send gills to another user.")
        .addUserOption(option =>
            option.setName('user')
                .setDescription('The user to send gills to.')
                .setRequired(true))
        .addNumberOption(option =>
            option.setName('amount')
                .setDescription('The amount of gills to send.')
                .setRequired(true)) as SlashCommandBuilder,
    async execute(interaction: CommandInteraction) {
        await interaction.deferReply();

        const discordSenderUser = interaction.user;
        var sender = await findUser(discordSenderUser.id, discordSenderUser.globalName);
        const discordReceiverUser = interaction.options.get('user', true).user;
        var receiver = await findUser(discordReceiverUser.id, discordReceiverUser.globalName);
        const amount = interaction.options.get('amount', true).value as number;

        // Check if sender is receiver
        if (sender.discordId === receiver.discordId) {
            const embed = new EmbedBuilder()
                .setColor("#e74c3c")
                .setTitle(`❌ Send - Error`)
                .setDescription(`You can't send gills to yourself!`)
                .setTimestamp();

            return await interaction.editReply({ embeds: [embed] });
        }

        if (amount > sender.gillAmount) {
            const embed = new EmbedBuilder()
                .setColor("#e74c3c")
                .setTitle(`❌ Send - Error`)
                .setDescription(`You don't have: \`${amount}\` 🪙 Gills!`)
                .setTimestamp();

            return await interaction.editReply({ embeds: [embed] });
        }

        if (amount <= 0) {
            const embed = new EmbedBuilder()
                .setColor("#e74c3c")
                .setTitle(`❌ Send - Error`)
                .setDescription(`You can't send \`${amount}\` 🪙 Gills!`)
                .setTimestamp();

            return await interaction.editReply({ embeds: [embed] });
        }

        // Check if amount is decimal
        if (amount % 1 !== 0) {
            const embed = new EmbedBuilder()
                .setColor("#e74c3c")
                .setTitle(`❌ Send - Error`)
                .setDescription(`You can't send \`${amount}\` 🪙 Gills!`)
                .setTimestamp();

            return await interaction.editReply({ embeds: [embed] });
        }

        sender.gillAmount -= amount;
        receiver.gillAmount += amount;
        await sender.save();
        await receiver.save();
        
        const embed = new EmbedBuilder()
            .setColor("#3498db")
            .setTitle(`✅ Send - Success`)
            .setDescription(`You sent **${amount}** 🪙 Gills to ${receiver.discordUsername}!`)
            .setTimestamp();

        return await interaction.editReply({ embeds: [embed] });
    }
}

export default command;