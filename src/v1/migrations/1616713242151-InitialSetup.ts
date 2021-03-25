import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSetup1616713242151 implements MigrationInterface {
	public name = "InitialSetup1616713242151";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE "githubs" ("github_user_id" character varying(25) NOT NULL, "user_id" character varying NOT NULL, "github_access_token" character varying NOT NULL, "github_refresh_token" character varying NOT NULL, "github_expiration_date" TIMESTAMP NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_8fe3cfb71af4c5ec2cf8252db93" UNIQUE ("user_id"), CONSTRAINT "REL_8fe3cfb71af4c5ec2cf8252db9" UNIQUE ("user_id"), CONSTRAINT "PK_f582b5411dc804e17b7a9b18e3f" PRIMARY KEY ("github_user_id"))`,
		);
		await queryRunner.query(
			`CREATE TABLE "googles" ("google_user_id" character varying(25) NOT NULL, "user_id" character varying NOT NULL, "google_access_token" character varying NOT NULL, "google_refresh_token" character varying NOT NULL, "google_expiration_date" TIMESTAMP NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_f33c76093c33d5a27cafc1e948e" UNIQUE ("user_id"), CONSTRAINT "REL_f33c76093c33d5a27cafc1e948" UNIQUE ("user_id"), CONSTRAINT "PK_b62fabcd900e4a170fb4d0cb0ff" PRIMARY KEY ("google_user_id"))`,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_f33c76093c33d5a27cafc1e948" ON "googles" ("user_id") `,
		);
		await queryRunner.query(
			`CREATE TABLE "linkedins" ("linkedin_user_id" character varying(25) NOT NULL, "user_id" character varying NOT NULL, "linkedin_access_token" character varying NOT NULL, "linkedin_refresh_token" character varying NOT NULL, "linkedin_expiration_date" TIMESTAMP NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_419eb8b20cccdeff3c706eb978a" UNIQUE ("user_id"), CONSTRAINT "REL_419eb8b20cccdeff3c706eb978" UNIQUE ("user_id"), CONSTRAINT "PK_6c85e73bfcb3c54ff421684f693" PRIMARY KEY ("linkedin_user_id"))`,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_419eb8b20cccdeff3c706eb978" ON "linkedins" ("user_id") `,
		);
		await queryRunner.query(
			`CREATE TABLE "verify_accounts" ("id" character varying NOT NULL, "user_id" character varying NOT NULL, "verification_code" character varying NOT NULL, "verified_at" TIMESTAMP, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_2700364927569c6e1927d816880" UNIQUE ("user_id"), CONSTRAINT "REL_2700364927569c6e1927d81688" UNIQUE ("user_id"), CONSTRAINT "PK_a7a8190a7cd9a79586952afed49" PRIMARY KEY ("id"))`,
		);
		await queryRunner.query(
			`CREATE TABLE "users" ("id" character varying(36) NOT NULL, "email" character varying(50) NOT NULL, "password" character varying(200) NOT NULL, "username" character varying(16) NOT NULL, "name" character varying(60) NOT NULL, "surnames" character varying(60) NOT NULL, "pin" character varying(4) NOT NULL, "avatar" character varying(150), "headline" character varying NOT NULL, "birthday" TIMESTAMP NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_7c2493a5545d9e8ce310b8791b" ON "users" ("headline") `,
		);
		await queryRunner.query(
			`CREATE TABLE "discords" ("discord_user_id" character varying(25) NOT NULL, "user_id" character varying NOT NULL, "discord_access_token" character varying NOT NULL, "discord_refresh_token" character varying NOT NULL, "discord_expiration_date" TIMESTAMP NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_e06f873793cb5039ed53415e3f8" UNIQUE ("user_id"), CONSTRAINT "REL_e06f873793cb5039ed53415e3f" UNIQUE ("user_id"), CONSTRAINT "PK_d23e8fbbf29bba70d9a5dd5d957" PRIMARY KEY ("discord_user_id"))`,
		);
		await queryRunner.query(
			`CREATE INDEX "IDX_e06f873793cb5039ed53415e3f" ON "discords" ("user_id") `,
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
			`ALTER TABLE "verify_accounts" ADD CONSTRAINT "FK_2700364927569c6e1927d816880" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE "discords" ADD CONSTRAINT "FK_e06f873793cb5039ed53415e3f8" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "discords" DROP CONSTRAINT "FK_e06f873793cb5039ed53415e3f8"`,
		);
		await queryRunner.query(
			`ALTER TABLE "verify_accounts" DROP CONSTRAINT "FK_2700364927569c6e1927d816880"`,
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
		await queryRunner.query(`DROP INDEX "IDX_e06f873793cb5039ed53415e3f"`);
		await queryRunner.query(`DROP TABLE "discords"`);
		await queryRunner.query(`DROP INDEX "IDX_7c2493a5545d9e8ce310b8791b"`);
		await queryRunner.query(`DROP TABLE "users"`);
		await queryRunner.query(`DROP TABLE "verify_accounts"`);
		await queryRunner.query(`DROP INDEX "IDX_419eb8b20cccdeff3c706eb978"`);
		await queryRunner.query(`DROP TABLE "linkedins"`);
		await queryRunner.query(`DROP INDEX "IDX_f33c76093c33d5a27cafc1e948"`);
		await queryRunner.query(`DROP TABLE "googles"`);
		await queryRunner.query(`DROP TABLE "githubs"`);
	}
}
