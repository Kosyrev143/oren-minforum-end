import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1715579538946 implements MigrationInterface {
    name = 'Auto1715579538946'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("user_id" SERIAL NOT NULL, "name" character varying NOT NULL, "surname" character varying NOT NULL, "middlename" character varying NOT NULL, "email" character varying NOT NULL, "phone" character varying NOT NULL, "organization" character varying NOT NULL, "post" character varying NOT NULL, "district" character varying NOT NULL, "events" integer array NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updateAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_758b8ce7c18b9d347461b30228d" PRIMARY KEY ("user_id"))`);
        await queryRunner.query(`CREATE TABLE "event" ("event_id" SERIAL NOT NULL, "name" character varying NOT NULL, "start_time" TIME NOT NULL, "end_time" TIME NOT NULL, "available_seats" integer NOT NULL DEFAULT '250', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updateAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_fe0840e4557d98ed53b0ae51466" PRIMARY KEY ("event_id"))`);
        await queryRunner.query(`CREATE TABLE "booking" ("booking_id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updateAt" TIMESTAMP NOT NULL DEFAULT now(), "user_id" integer, "event_id" integer, CONSTRAINT "PK_9ecc24640e39cd493c318a117f1" PRIMARY KEY ("booking_id"))`);
        await queryRunner.query(`CREATE TABLE "qrcode" ("qrcode_id" SERIAL NOT NULL, "url" character varying NOT NULL, "booking_id" integer, CONSTRAINT "PK_49df77d0607e279d0856cb4fefe" PRIMARY KEY ("qrcode_id"))`);
        await queryRunner.query(`ALTER TABLE "booking" ADD CONSTRAINT "FK_276896d1a1a30be6de9d7d43f53" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "booking" ADD CONSTRAINT "FK_020993a41994bae310ecd6c17a5" FOREIGN KEY ("event_id") REFERENCES "event"("event_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "qrcode" ADD CONSTRAINT "FK_1c78074aa0412c179fbf141f25e" FOREIGN KEY ("booking_id") REFERENCES "booking"("booking_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "qrcode" DROP CONSTRAINT "FK_1c78074aa0412c179fbf141f25e"`);
        await queryRunner.query(`ALTER TABLE "booking" DROP CONSTRAINT "FK_020993a41994bae310ecd6c17a5"`);
        await queryRunner.query(`ALTER TABLE "booking" DROP CONSTRAINT "FK_276896d1a1a30be6de9d7d43f53"`);
        await queryRunner.query(`DROP TABLE "qrcode"`);
        await queryRunner.query(`DROP TABLE "booking"`);
        await queryRunner.query(`DROP TABLE "event"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
