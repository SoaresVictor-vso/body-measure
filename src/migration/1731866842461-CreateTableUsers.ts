import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableUsers1731866842461 implements MigrationInterface {
    name = 'CreateTableUsers1731866842461'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "USERS" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "name" character varying NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, "is_email_verified" boolean NOT NULL, "role" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "UQ_a1689164dbbcca860ce6d17b2e1" UNIQUE ("email"), CONSTRAINT "UQ_055984372b62f71f274f3fe361a" UNIQUE ("username"), CONSTRAINT "PK_b16c39a00c89083529c6166fa5b" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "USERS"`);
    }

}
