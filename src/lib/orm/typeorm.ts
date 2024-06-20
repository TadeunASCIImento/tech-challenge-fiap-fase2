import { DataSource } from "typeorm";

import { env } from "../../env";
import { Post } from "../../entities/post.entity";
import { PostCREATETABLE1718804438529 } from "./migrations/1718804438529-PostCREATE_TABLE";

export const appDataSource = new DataSource({
    type: 'postgres',
    host: env.DATABASE_HOST,
    port: env.DATABASE_PORT,
    username: env.DATABASE_USER,
    password: env.DATABASE_PASSWORD,
    database: env.DATABASE_NAME,
    entities: [ Post ],
    migrations: [ PostCREATETABLE1718804438529 ],
    logging: env.NODE_ENV === 'development'

});

appDataSource.initialize().then(() => {
    console.log(`Connected to database ${ env.DATABASE_NAME } using typeorm`);
})
.catch((error) => {
    console.error(`Error connecting to database: ${ env.DATABASE_NAME }`, error);
});