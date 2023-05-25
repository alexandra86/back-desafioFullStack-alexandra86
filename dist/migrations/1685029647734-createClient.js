"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateClient1685029647734 = void 0;
class CreateClient1685029647734 {
    constructor() {
        this.name = 'CreateClient1685029647734';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE TYPE "public"."contacts_gender_enum" AS ENUM('male', 'female', 'Not binary', 'Not informed')`);
            yield queryRunner.query(`CREATE TABLE "contacts" ("id" SERIAL NOT NULL, "fullName" character varying(127) NOT NULL, "email" character varying(127), "phone" character varying(45) NOT NULL, "registerDate" TIMESTAMP NOT NULL DEFAULT now(), "gender" "public"."contacts_gender_enum" NOT NULL DEFAULT 'Not informed', "clientId" integer, CONSTRAINT "PK_b99cd40cfd66a99f1571f4f72e6" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TYPE "public"."clients_gender_enum" AS ENUM('male', 'female', 'no binary', 'I prefer not to say')`);
            yield queryRunner.query(`CREATE TABLE "clients" ("id" SERIAL NOT NULL, "name" character varying(127) NOT NULL, "email" character varying(127) NOT NULL, "password" character varying(120) NOT NULL, "phone" character varying(45) NOT NULL, "image" text, "registerDate" TIMESTAMP NOT NULL DEFAULT now(), "gender" "public"."clients_gender_enum" NOT NULL DEFAULT 'I prefer not to say', CONSTRAINT "UQ_b48860677afe62cd96e12659482" UNIQUE ("email"), CONSTRAINT "PK_f1ab7cf3a5714dbc6bb4e1c28a4" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`ALTER TABLE "contacts" ADD CONSTRAINT "FK_8039454fab552403d5579cf7423" FOREIGN KEY ("clientId") REFERENCES "clients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "contacts" DROP CONSTRAINT "FK_8039454fab552403d5579cf7423"`);
            yield queryRunner.query(`DROP TABLE "clients"`);
            yield queryRunner.query(`DROP TYPE "public"."clients_gender_enum"`);
            yield queryRunner.query(`DROP TABLE "contacts"`);
            yield queryRunner.query(`DROP TYPE "public"."contacts_gender_enum"`);
        });
    }
}
exports.CreateClient1685029647734 = CreateClient1685029647734;
