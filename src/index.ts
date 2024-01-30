import DatabaseService from "./services/DatabaseService";
import * as dotenv from "dotenv";
import DiscordService from "./services/DiscordService";
dotenv.config();

export default class NanoBot {
    private databaseService: DatabaseService;
    private discordService: DiscordService;

    constructor() {
        this.databaseService = new DatabaseService();
        this.discordService = new DiscordService();

    }

    public init() {
        this.databaseService.init(() => {
            this.discordService.init();
        });
    }
}

const nanoBot = new NanoBot();
nanoBot.init();
