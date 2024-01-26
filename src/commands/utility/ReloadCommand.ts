import { Collection, CommandInteraction, SlashCommandBuilder } from "discord.js";
import ICommand from "../../interfaces/ICommand";
import capitalizeFirstLetter from "../../utils/capitalizeFirstLetter";

const command: ICommand = {
    cooldown: 5,
    data: new SlashCommandBuilder()
        .setName("reload")
        .setDescription("Reloads specified command.")
        .addStringOption(option =>
			option.setName('command')
				.setDescription('The command to reload.')
				.setRequired(true)) as SlashCommandBuilder,
    async execute(
        interaction: CommandInteraction,
        commands: Collection<string, any>
    ) {
        const commandName = interaction.options.get('command', true).value.toString().toLowerCase();
        const command = commands.get(commandName);

        if (!command) {
            return interaction.reply(`There is no command with name \`${commandName}\`!`);
        }

        delete require.cache[require.resolve(`./${capitalizeFirstLetter(command.data.name)}Command.ts`)];

        try {
            commands.delete(command.data.name);
            const newCommand = require(`./${capitalizeFirstLetter(command.data.name)}Command.ts`).default;
            commands.set(newCommand.data.name, newCommand);
            await interaction.reply(`Command \`${newCommand.data.name}\` was reloaded!`);
        } catch (error) {
            console.error(error);
            await interaction.reply(`There was an error while reloading a command \`${command.data.name}\`:\n\`${error.message}\``);
        }

    }
}

export default command;