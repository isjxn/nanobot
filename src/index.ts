/*import { AppDataSource } from "./data-source"
//import { User } from "./entity/User"

AppDataSource.initialize().then(async () => {

    /*console.log("Inserting a new user into the database...")
    const user = new User()
    user.firstName = "Timber"
    user.lastName = "Saw"
    user.age = 25
    await AppDataSource.manager.save(user)
    console.log("Saved a new user with id: " + user.id)

    console.log("Loading users from the database...")
    const users = await AppDataSource.manager.find(User)
    console.log("Loaded users: ", users)

    console.log("Here you can setup and run express / fastify / any other framework.")*/
//}).catch(error => console.log(error))

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