import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableMectrics1732127175292 implements MigrationInterface {
    name = 'CreateTableMectrics1732127175292'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "METRIC" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "unit" character varying NOT NULL, CONSTRAINT "UQ_68a6001a50a1876f0854f8f911f" UNIQUE ("name"), CONSTRAINT "PK_c37969e361585c0048f4767da55" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "METRIC"`);
    }

}
