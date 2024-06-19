import { DataSource } from "typeorm";

import { env } from "../../env";
import { Post } from "../../entities/post.entity";

export const appDataSource = new DataSource({
    type: 'postgres',
    host: env.DATABASE_HOST,
    port: env.DATABASE_PORT,
    username: env.DATABASE_USER,
    password: env.DATABASE_PASSWORD,
    database: env.DATABASE_NAME,
    entities: [Post],
    logging: env.NODE_ENV === 'development'

});

appDataSource.initialize().then(() => {
    console.log(`Connected to database ${ env.DATABASE_NAME } using typeorm`);
})
.catch((error) => {
    console.error(`Error connecting to database: ${ env.DATABASE_NAME }`, error);
});