import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import { Photo } from "./entity/Photo"
import { Peca } from "./entity/Peca"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "helius-dev",
    synchronize: true,
    logging: false,
    entities: [User, Peca, Photo],
    migrations: [],
    subscribers: [],
})
