import { Client, Events } from "discord.js";
import IEvent from "../interfaces/IEvent";

const event: IEvent = {
    name: Events.ClientReady,
    once: true,
    execute(client: Client) {
        console.log(`[DiscordService] Ready! Logged in as ${client.user.tag}`);
    }
}

export default event;