import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterTableSessionDate1734717230050 implements MigrationInterface {
    name = 'AlterTableSessionDate1734717230050'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Step 1: Add a temporary column for the ISO string
        await queryRunner.query(`ALTER TABLE "SESSIONS" ADD "temp_date" character varying`);

        // Step 2: Populate the temporary column with ISO strings
        await queryRunner.query(`
            UPDATE "SESSIONS" 
            SET "temp_date" = TO_CHAR("date", 'YYYY-MM-DD"T"HH24:MI:SS"Z"')
        `);

        // Step 3: Drop the old `date` column
        await queryRunner.query(`ALTER TABLE "SESSIONS" DROP COLUMN "date"`);

        // Step 4: Rename the temporary column to `date` and make it NOT NULL
        await queryRunner.query(`ALTER TABLE "SESSIONS" RENAME COLUMN "temp_date" TO "date"`);
        await queryRunner.query(`ALTER TABLE "SESSIONS" ALTER COLUMN "date" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Reverse the changes if needed
        await queryRunner.query(`ALTER TABLE "SESSIONS" ADD "temp_date" DATE`);
        await queryRunner.query(`
            UPDATE "SESSIONS"
            SET "temp_date" = TO_DATE("date", 'YYYY-MM-DD"T"HH24:MI:SS"Z"')
        `);
        await queryRunner.query(`ALTER TABLE "SESSIONS" DROP COLUMN "date"`);
        await queryRunner.query(`ALTER TABLE "SESSIONS" RENAME COLUMN "temp_date" TO "date"`);
    }

}
