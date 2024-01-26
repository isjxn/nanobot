import { CommandInteraction, SlashCommandBuilder } from "discord.js";
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

        if (amount > sender.gillAmount) {
            return interaction.editReply(`You don't have enough gills to send ${amount} gills!`);
        }

        if (amount <= 0) {
            return interaction.editReply(`You can't send ${amount} gills!`);
        }

        sender.gillAmount -= amount;
        receiver.gillAmount += amount;
        await sender.save();
        await receiver.save();

        return interaction.editReply(`You sent ${amount} gills to ${receiver.discordUsername}!`);
    }
}

export default command;