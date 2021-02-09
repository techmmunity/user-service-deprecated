import {
	BaseEntity,
	Column,
	Entity,
	Repository,
	FindManyOptions,
	FindOneOptions,
	PrimaryColumn,
} from "typeorm";

import { EntityType } from "types/entity";

@Entity("user_tokens")
export class UserTokenEntity extends BaseEntity {
	@PrimaryColumn()
	public id: string;

	/**
	 *
	 * Discord
	 *
	 */

	@Column({
		name: "discord_access_token",
		nullable: true,
	})
	public discordAccessToken?: string;

	@Column({
		name: "discord_refresh_token",
		nullable: true,
	})
	public discordRefreshToken?: string;

	@Column({
		name: "discord_expiration_date",
		nullable: true,
	})
	public discordExpirationDate?: Date;

	/**
	 *
	 * Google
	 *
	 */

	@Column({
		name: "google_access_token",
		nullable: true,
	})
	public googleAccessToken?: string;

	@Column({
		name: "google_refresh_token",
		nullable: true,
	})
	public googleRefreshToken?: string;

	@Column({
		name: "google_expiration_date",
		nullable: true,
	})
	public googleExpirationDate?: Date;

	/**
	 *
	 * GitHub
	 *
	 */

	@Column({
		name: "github_access_token",
		nullable: true,
	})
	public githubAccessToken?: string;

	@Column({
		name: "github_refresh_token",
		nullable: true,
	})
	public githubRefreshToken?: string;

	@Column({
		name: "github_expiration_date",
		nullable: true,
	})
	public githubExpirationDate?: Date;

	/**
	 *
	 * Linkedin
	 *
	 */

	@Column({
		name: "linkedin_access_token",
		nullable: true,
	})
	public linkedinAccessToken?: string;

	@Column({
		name: "linkedin_refresh_token",
		nullable: true,
	})
	public linkedinRefreshToken?: string;

	@Column({
		name: "linkedin_expiration_date",
		nullable: true,
	})
	public linkedinExpirationDate?: Date;
}

export type UserTokenType = EntityType<UserTokenEntity>;

export type UserTokenRepository = Repository<UserTokenEntity>;

export type UserTokenFindMany = FindManyOptions<UserTokenEntity>;

export type UserTokenFindOne = FindOneOptions<UserTokenEntity>;
