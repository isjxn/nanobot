import { CommandInteraction, SlashCommandBuilder } from "discord.js";

export default interface ICommand {
    data: SlashCommandBuilder
    execute: (interaction: CommandInteraction) => void
}