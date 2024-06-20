import { MigrationInterface, QueryRunner } from "typeorm";

export class PostCREATETABLE1718804438529 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE EXTENSION IF NOT EXISTS "uuid-ossp"
        `)
        
        await queryRunner.query(
            `CREATE TABLE post(
                ID UUID PRIMARY KEY,
                TITLE VARCHAR(200) NOT NULL,
                DESCRIPTION VARCHAR(5000) NOT NULL
           )`
        )

        await queryRunner.query(`
            ALTER TABLE post
            ALTER COLUMN id SET DEFAULT uuid_generate_v4();
        `)
        
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE post;
        `)
    }

}
