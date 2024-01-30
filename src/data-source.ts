import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "nanobot.db",
    /*host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "nanobot",*/
    synchronize: true,
    logging: false,
    entities: [User],
    migrations: [],
    subscribers: [],
})
