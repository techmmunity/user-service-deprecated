import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveDiscordUsernameColumn1622119690877
	implements MigrationInterface {
	public name = "RemoveDiscordUsernameColumn1622119690877";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "discords" DROP COLUMN "discord_username"`,
		);
		await queryRunner.query(
			`ALTER TABLE "discords" DROP CONSTRAINT "UQ_d23e8fbbf29bba70d9a5dd5d957"`,
		);
		await queryRunner.query(
			`ALTER TABLE "discords" DROP COLUMN "discord_user_id"`,
		);
		await queryRunner.query(
			`ALTER TABLE "discords" ADD "discord_user_id" character varying(18) NOT NULL`,
		);
		await queryRunner.query(
			`ALTER TABLE "discords" ADD CONSTRAINT "UQ_d23e8fbbf29bba70d9a5dd5d957" UNIQUE ("discord_user_id")`,
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "discords" DROP CONSTRAINT "UQ_d23e8fbbf29bba70d9a5dd5d957"`,
		);
		await queryRunner.query(
			`ALTER TABLE "discords" DROP COLUMN "discord_user_id"`,
		);
		await queryRunner.query(
			`ALTER TABLE "discords" ADD "discord_user_id" character varying(25) NOT NULL`,
		);
		await queryRunner.query(
			`ALTER TABLE "discords" ADD CONSTRAINT "UQ_d23e8fbbf29bba70d9a5dd5d957" UNIQUE ("discord_user_id")`,
		);
		await queryRunner.query(
			`ALTER TABLE "discords" ADD "discord_username" character varying(100) NOT NULL`,
		);
	}
}
