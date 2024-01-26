import { AppDataSource } from "../data-source";

export default class DatabaseService {
    constructor() {

    }

    public init(callback: Function) {
        AppDataSource.initialize().then(async () => {
            console.log("[DatabaseService] init");
            callback();
        }).catch(error => console.log(error));
    }
}