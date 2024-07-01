import { MigrationInterface, QueryRunner } from "typeorm";

export class UserCREATETABLE1718888995683 implements MigrationInterface {
    
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE EXTENSION IF NOT EXISTS "uuid-ossp"
        `)
    
        await queryRunner.query(`
            CREATE TABLE "users"(
                ID UUID PRIMARY KEY,
                USER_NAME VARCHAR(200) UNIQUE NOT NULL,
                PASSWORD VARCHAR(200) NOT NULL,
                ID_PROFILE BIGINT NOT NULL
            )
        `)

        await queryRunner.query(`
            ALTER TABLE users
            ALTER COLUMN id SET DEFAULT uuid_generate_v4();
        `)

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE users;
        `)
    }

}
