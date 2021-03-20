import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSetup1616207991638 implements MigrationInterface {
	public name = "InitialSetup1616207991638";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE "user_tokens" ("id" character varying NOT NULL, "discord_access_token" character varying, "discord_refresh_token" character varying, "discord_expiration_date" TIMESTAMP, "google_access_token" character varying, "google_refresh_token" character varying, "google_expiration_date" TIMESTAMP, "github_access_token" character varying, "github_refresh_token" character varying, "github_expiration_date" TIMESTAMP, "linkedin_access_token" character varying, "linkedin_refresh_token" character varying, "linkedin_expiration_date" TIMESTAMP, CONSTRAINT "PK_63764db9d9aaa4af33e07b2f4bf" PRIMARY KEY ("id"))`,
		);
		await queryRunner.query(
			`CREATE TABLE "users" ("id" character varying NOT NULL, "discord_user_id" character varying, "google_user_id" character varying, "github_user_id" character varying, "linkedin_user_id" character varying, "email" character varying NOT NULL, "password" character varying NOT NULL, "username" character varying NOT NULL, "name" character varying NOT NULL, "surnames" character varying NOT NULL, "pin" character varying NOT NULL, "avatar" character varying, "verified" boolean NOT NULL DEFAULT false, "headline" character varying NOT NULL, "birthday" TIMESTAMP NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_7c2493a5545d9e8ce310b8791b" ON "users" ("headline") `,
		);
		await queryRunner.query(
			`CREATE TABLE "verify_account" ("id" character varying NOT NULL, "verification_code" character varying NOT NULL, "verified_at" TIMESTAMP, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_101b5866bc8076cb2c20e21ff74" PRIMARY KEY ("id"))`,
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`DROP TABLE "verify_account"`);
		await queryRunner.query(`DROP INDEX "IDX_7c2493a5545d9e8ce310b8791b"`);
		await queryRunner.query(`DROP TABLE "users"`);
		await queryRunner.query(`DROP TABLE "user_tokens"`);
	}
}
