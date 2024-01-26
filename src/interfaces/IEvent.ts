import { Events } from "discord.js";

export default interface IEvent {
    name: Events;
    once: boolean;
    execute(...args: any[]): void;
}