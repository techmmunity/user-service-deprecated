/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable class-methods-use-this */
/* eslint-disable filenames/match-regex */

import { MigrationInterface, QueryRunner } from "typeorm";

export class AddVerifiedColumnToContactTable1619785636211
	implements MigrationInterface
{
	public name = "AddVerifiedColumnToContactTable1619785636211";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "contacts" ADD "verified" boolean NOT NULL DEFAULT false`,
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "contacts" DROP COLUMN "verified"`);
	}
}
