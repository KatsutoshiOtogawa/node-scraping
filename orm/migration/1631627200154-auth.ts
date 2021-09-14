import {MigrationInterface, QueryRunner} from "typeorm";

export class auth1631627200154 implements MigrationInterface {
    name = 'auth1631627200154'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."user" ADD "email" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."user" ADD "password" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."user" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "public"."user" DROP COLUMN "email"`);
    }

}
