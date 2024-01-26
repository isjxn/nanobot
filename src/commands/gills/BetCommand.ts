import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import ICommand from "../../interfaces/ICommand";
import findUser from "../../utils/findUser";

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
                    {name: 'Higher', value: 'higher'},
                    {name: 'Lower', value: 'lower'}
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
            return interaction.editReply(`You don't have enough gills to bet ${amount} gills!`);
        }

        if (amount <= 0) {
            return interaction.editReply(`You can't bet ${amount} gills!`);
        }

        if (higherOrLower !== 'higher' && higherOrLower !== 'lower') {
            return interaction.editReply(`You can only bet higher or lower!`);
        }

        if ((higherOrLower === 'higher' && roll >= 50) || (higherOrLower === 'lower' && roll < 50)) {
            user.gillAmount += amount;
            await user.save();
            return interaction.editReply(`You rolled ${roll} and won ${amount} gills because you said: ${higherOrLower}!`);
        }

        user.gillAmount -= amount;
        await user.save();
        return interaction.editReply(`You rolled ${roll} and lost ${amount} gills because you said: ${higherOrLower}!`);
    }
}

export default command;