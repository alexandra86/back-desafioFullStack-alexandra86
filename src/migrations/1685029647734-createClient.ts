import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateClient1685029647734 implements MigrationInterface {
    name = 'CreateClient1685029647734'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."contacts_gender_enum" AS ENUM('male', 'female', 'Not binary', 'Not informed')`);
        await queryRunner.query(`CREATE TABLE "contacts" ("id" SERIAL NOT NULL, "fullName" character varying(127) NOT NULL, "email" character varying(127), "phone" character varying(45) NOT NULL, "registerDate" TIMESTAMP NOT NULL DEFAULT now(), "gender" "public"."contacts_gender_enum" NOT NULL DEFAULT 'Not informed', "clientId" integer, CONSTRAINT "PK_b99cd40cfd66a99f1571f4f72e6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."clients_gender_enum" AS ENUM('male', 'female', 'no binary', 'I prefer not to say')`);
        await queryRunner.query(`CREATE TABLE "clients" ("id" SERIAL NOT NULL, "name" character varying(127) NOT NULL, "email" character varying(127) NOT NULL, "password" character varying(120) NOT NULL, "phone" character varying(45) NOT NULL, "image" text, "registerDate" TIMESTAMP NOT NULL DEFAULT now(), "gender" "public"."clients_gender_enum" NOT NULL DEFAULT 'I prefer not to say', CONSTRAINT "UQ_b48860677afe62cd96e12659482" UNIQUE ("email"), CONSTRAINT "PK_f1ab7cf3a5714dbc6bb4e1c28a4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "contacts" ADD CONSTRAINT "FK_8039454fab552403d5579cf7423" FOREIGN KEY ("clientId") REFERENCES "clients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contacts" DROP CONSTRAINT "FK_8039454fab552403d5579cf7423"`);
        await queryRunner.query(`DROP TABLE "clients"`);
        await queryRunner.query(`DROP TYPE "public"."clients_gender_enum"`);
        await queryRunner.query(`DROP TABLE "contacts"`);
        await queryRunner.query(`DROP TYPE "public"."contacts_gender_enum"`);
    }

}
