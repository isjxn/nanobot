import { CommandInteraction, SlashCommandBuilder } from "discord.js";

export default interface ICommand {
    cooldown: number
    data: SlashCommandBuilder
    execute: (interaction: CommandInteraction, ...args) => void
}