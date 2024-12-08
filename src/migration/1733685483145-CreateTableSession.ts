import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableSession1733685483145 implements MigrationInterface {
    name = 'CreateTableSession1733685483145'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "MEASURE" ("id" SERIAL NOT NULL, "session_id" integer NOT NULL, "metric_id" integer NOT NULL, "value" integer NOT NULL, CONSTRAINT "PK_25aba2626e6cf9e945d56064c25" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "MEASURE" ADD CONSTRAINT "FK_353aaf620d2240053a89f142aa2" FOREIGN KEY ("session_id") REFERENCES "SESSIONS"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "MEASURE" ADD CONSTRAINT "FK_a7e5b45052cd9348114d2c5e12a" FOREIGN KEY ("metric_id") REFERENCES "METRIC"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "MEASURE" DROP CONSTRAINT "FK_a7e5b45052cd9348114d2c5e12a"`);
        await queryRunner.query(`ALTER TABLE "MEASURE" DROP CONSTRAINT "FK_353aaf620d2240053a89f142aa2"`);
        await queryRunner.query(`DROP TABLE "MEASURE"`);
    }

}
