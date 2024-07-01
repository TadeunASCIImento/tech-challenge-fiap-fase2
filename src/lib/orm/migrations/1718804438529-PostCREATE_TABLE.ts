import { MigrationInterface, QueryRunner } from "typeorm";

export class PostCREATETABLE1718804438529 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE EXTENSION IF NOT EXISTS "uuid-ossp"
        `)
        
        await queryRunner.query(
            `CREATE TABLE POST(
                ID UUID PRIMARY KEY,
                TITLE VARCHAR(200) NOT NULL,
                DESCRIPTION VARCHAR(5000) NOT NULL
           )`
        )

        await queryRunner.query(`
            ALTER TABLE POST
            ALTER COLUMN id SET DEFAULT uuid_generate_v4();
        `)
        
        await queryRunner.query(
            `CREATE TABLE USER_PROFILE(
                ID SERIAL PRIMARY KEY,
                PROFILE VARCHAR(50) UNIQUE NOT NULL 
           )`
        )

        await queryRunner.query(
            `INSERT INTO user_profile (profile) VALUES ('user_admin');`
        )
        await queryRunner.query(
            `INSERT INTO user_profile (profile) VALUES ('user_common');`
        )
        
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE post;
        `)
    }

}
