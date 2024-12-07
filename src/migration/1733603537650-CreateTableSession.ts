import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableSession1733603537650 implements MigrationInterface {
    name = 'CreateTableSession1733603537650'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "SESSIONS" ("id" SERIAL NOT NULL, "user_id" uuid NOT NULL, "date" date NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_393aa92856fd0c6d4b53d5c7262" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "SESSIONS" ADD CONSTRAINT "FK_8fecdc31ef61a8cb70853ba3db5" FOREIGN KEY ("user_id") REFERENCES "USERS"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "SESSIONS" DROP CONSTRAINT "FK_8fecdc31ef61a8cb70853ba3db5"`);
        await queryRunner.query(`DROP TABLE "SESSIONS"`);
    }

}
