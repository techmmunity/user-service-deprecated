/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable class-methods-use-this */
/* eslint-disable filenames/match-regex */

import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateConfirmationTokenRelations1619744826025
	implements MigrationInterface
{
	public name = "UpdateConfirmationTokenRelations1619744826025";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE "confirmation_tokens" ("id" character varying(36) NOT NULL, "user_id" character varying(36), "contact_id" character varying(36), "type" character varying NOT NULL, "token" character varying(6) NOT NULL, "used_at" TIMESTAMP, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_e48a0124b300b3b1e14d8b7baa4" PRIMARY KEY ("id"))`,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_3c2f3b5d5d2b0550c52ab05275" ON "confirmation_tokens" ("token") `,
		);
		await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "verified_at"`);
		await queryRunner.query(
			`ALTER TABLE "discords" DROP CONSTRAINT "FK_e06f873793cb5039ed53415e3f8"`,
		);
		await queryRunner.query(
			`ALTER TABLE "discords" ADD CONSTRAINT "UQ_e06f873793cb5039ed53415e3f8" UNIQUE ("user_id")`,
		);
		await queryRunner.query(
			`ALTER TABLE "githubs" DROP CONSTRAINT "FK_8fe3cfb71af4c5ec2cf8252db93"`,
		);
		await queryRunner.query(
			`ALTER TABLE "githubs" ADD CONSTRAINT "UQ_8fe3cfb71af4c5ec2cf8252db93" UNIQUE ("user_id")`,
		);
		await queryRunner.query(
			`ALTER TABLE "googles" DROP CONSTRAINT "FK_f33c76093c33d5a27cafc1e948e"`,
		);
		await queryRunner.query(
			`ALTER TABLE "googles" ADD CONSTRAINT "UQ_f33c76093c33d5a27cafc1e948e" UNIQUE ("user_id")`,
		);
		await queryRunner.query(
			`ALTER TABLE "linkedins" DROP CONSTRAINT "FK_419eb8b20cccdeff3c706eb978a"`,
		);
		await queryRunner.query(
			`ALTER TABLE "linkedins" ADD CONSTRAINT "UQ_419eb8b20cccdeff3c706eb978a" UNIQUE ("user_id")`,
		);
		await queryRunner.query(
			`ALTER TABLE "discords" ADD CONSTRAINT "FK_e06f873793cb5039ed53415e3f8" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE "githubs" ADD CONSTRAINT "FK_8fe3cfb71af4c5ec2cf8252db93" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE "googles" ADD CONSTRAINT "FK_f33c76093c33d5a27cafc1e948e" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE "linkedins" ADD CONSTRAINT "FK_419eb8b20cccdeff3c706eb978a" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE "confirmation_tokens" ADD CONSTRAINT "FK_6930e098678c3c94eb9c1bf00e6" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE "confirmation_tokens" ADD CONSTRAINT "FK_5558ebbd7b3cd4c6a443fb2b2d1" FOREIGN KEY ("contact_id") REFERENCES "contacts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "confirmation_tokens" DROP CONSTRAINT "FK_5558ebbd7b3cd4c6a443fb2b2d1"`,
		);
		await queryRunner.query(
			`ALTER TABLE "confirmation_tokens" DROP CONSTRAINT "FK_6930e098678c3c94eb9c1bf00e6"`,
		);
		await queryRunner.query(
			`ALTER TABLE "linkedins" DROP CONSTRAINT "FK_419eb8b20cccdeff3c706eb978a"`,
		);
		await queryRunner.query(
			`ALTER TABLE "googles" DROP CONSTRAINT "FK_f33c76093c33d5a27cafc1e948e"`,
		);
		await queryRunner.query(
			`ALTER TABLE "githubs" DROP CONSTRAINT "FK_8fe3cfb71af4c5ec2cf8252db93"`,
		);
		await queryRunner.query(
			`ALTER TABLE "discords" DROP CONSTRAINT "FK_e06f873793cb5039ed53415e3f8"`,
		);
		await queryRunner.query(
			`ALTER TABLE "linkedins" DROP CONSTRAINT "UQ_419eb8b20cccdeff3c706eb978a"`,
		);
		await queryRunner.query(
			`ALTER TABLE "linkedins" ADD CONSTRAINT "FK_419eb8b20cccdeff3c706eb978a" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE "googles" DROP CONSTRAINT "UQ_f33c76093c33d5a27cafc1e948e"`,
		);
		await queryRunner.query(
			`ALTER TABLE "googles" ADD CONSTRAINT "FK_f33c76093c33d5a27cafc1e948e" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE "githubs" DROP CONSTRAINT "UQ_8fe3cfb71af4c5ec2cf8252db93"`,
		);
		await queryRunner.query(
			`ALTER TABLE "githubs" ADD CONSTRAINT "FK_8fe3cfb71af4c5ec2cf8252db93" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE "discords" DROP CONSTRAINT "UQ_e06f873793cb5039ed53415e3f8"`,
		);
		await queryRunner.query(
			`ALTER TABLE "discords" ADD CONSTRAINT "FK_e06f873793cb5039ed53415e3f8" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
		await queryRunner.query(`ALTER TABLE "users" ADD "verified_at" TIMESTAMP`);
		await queryRunner.query(`DROP INDEX "IDX_3c2f3b5d5d2b0550c52ab05275"`);
		await queryRunner.query(`DROP TABLE "confirmation_tokens"`);
	}
}
