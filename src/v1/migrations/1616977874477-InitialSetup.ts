/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable class-methods-use-this */
/* eslint-disable filenames/match-regex */

import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSetup1616977874477 implements MigrationInterface {
	public name = "InitialSetup1616977874477";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE "discords" ("user_id" character varying NOT NULL, "discord_user_id" character varying(25) NOT NULL, "discord_username" character varying(100) NOT NULL, "discord_access_token" character varying NOT NULL, "discord_refresh_token" character varying NOT NULL, "discord_expiration_date" TIMESTAMP NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_d23e8fbbf29bba70d9a5dd5d957" UNIQUE ("discord_user_id"), CONSTRAINT "REL_e06f873793cb5039ed53415e3f" UNIQUE ("user_id"), CONSTRAINT "PK_e06f873793cb5039ed53415e3f8" PRIMARY KEY ("user_id"))`,
		);
		await queryRunner.query(
			`CREATE TABLE "githubs" ("user_id" character varying NOT NULL, "github_user_id" character varying(25) NOT NULL, "github_username" character varying(100) NOT NULL, "github_access_token" character varying NOT NULL, "github_refresh_token" character varying NOT NULL, "github_expiration_date" TIMESTAMP NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_f582b5411dc804e17b7a9b18e3f" UNIQUE ("github_user_id"), CONSTRAINT "REL_8fe3cfb71af4c5ec2cf8252db9" UNIQUE ("user_id"), CONSTRAINT "PK_8fe3cfb71af4c5ec2cf8252db93" PRIMARY KEY ("user_id"))`,
		);
		await queryRunner.query(
			`CREATE TABLE "googles" ("user_id" character varying NOT NULL, "google_user_id" character varying(25) NOT NULL, "google_access_token" character varying NOT NULL, "google_refresh_token" character varying NOT NULL, "google_expiration_date" TIMESTAMP NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_b62fabcd900e4a170fb4d0cb0ff" UNIQUE ("google_user_id"), CONSTRAINT "REL_f33c76093c33d5a27cafc1e948" UNIQUE ("user_id"), CONSTRAINT "PK_f33c76093c33d5a27cafc1e948e" PRIMARY KEY ("user_id"))`,
		);
		await queryRunner.query(
			`CREATE TABLE "linkedins" ("user_id" character varying NOT NULL, "linkedin_user_id" character varying(25) NOT NULL, "linkedin_username" character varying(100) NOT NULL, "linkedin_access_token" character varying NOT NULL, "linkedin_refresh_token" character varying NOT NULL, "linkedin_expiration_date" TIMESTAMP NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_6c85e73bfcb3c54ff421684f693" UNIQUE ("linkedin_user_id"), CONSTRAINT "REL_419eb8b20cccdeff3c706eb978" UNIQUE ("user_id"), CONSTRAINT "PK_419eb8b20cccdeff3c706eb978a" PRIMARY KEY ("user_id"))`,
		);
		await queryRunner.query(
			`CREATE TABLE "users" ("id" character varying(36) NOT NULL, "username" character varying(16) NOT NULL, "pin" character varying(4) NOT NULL, "headline" character varying, "birthday" TIMESTAMP, "verified_at" TIMESTAMP, "full_name" character varying(121), "password" character varying(200), "avatar" character varying(150), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_7c2493a5545d9e8ce310b8791b" ON "users" ("headline") `,
		);
		await queryRunner.query(
			`CREATE TABLE "contacts" ("id" character varying(36) NOT NULL, "user_id" character varying(36) NOT NULL, "type" character varying NOT NULL, "primary" boolean NOT NULL DEFAULT false, "value" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_4dedebe8fcf567a11712a7a3165" UNIQUE ("value"), CONSTRAINT "PK_b99cd40cfd66a99f1571f4f72e6" PRIMARY KEY ("id"))`,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_4dedebe8fcf567a11712a7a316" ON "contacts" ("value") `,
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
			`ALTER TABLE "contacts" ADD CONSTRAINT "FK_af0a71ac1879b584f255c49c99a" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "contacts" DROP CONSTRAINT "FK_af0a71ac1879b584f255c49c99a"`,
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
		await queryRunner.query(`DROP INDEX "IDX_4dedebe8fcf567a11712a7a316"`);
		await queryRunner.query(`DROP TABLE "contacts"`);
		await queryRunner.query(`DROP INDEX "IDX_7c2493a5545d9e8ce310b8791b"`);
		await queryRunner.query(`DROP TABLE "users"`);
		await queryRunner.query(`DROP TABLE "linkedins"`);
		await queryRunner.query(`DROP TABLE "googles"`);
		await queryRunner.query(`DROP TABLE "githubs"`);
		await queryRunner.query(`DROP TABLE "discords"`);
	}
}
