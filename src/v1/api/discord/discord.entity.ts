import {
	BaseEntity,
	Column,
	Entity,
	CreateDateColumn,
	UpdateDateColumn,
	Repository,
	FindManyOptions,
	FindOneOptions,
	PrimaryColumn,
	Index,
	OneToOne,
	JoinColumn,
} from "typeorm";

import { UserEntity } from "../user/user.entity";

import { Limits } from "v1/config/limits";

import { DefaultOmitEntityFields } from "types/entity";

@Entity("discords")
export class DiscordEntity extends BaseEntity {
	@PrimaryColumn({
		name: "discord_user_id",
		length: Limits.ids.random.max,
		nullable: false,
		unique: true,
	})
	public discordUserId?: string;

	@Index()
	@Column({
		name: "user_id",
		nullable: false,
		unique: true,
	})
	public userId: string;

	@Column({
		name: "discord_access_token",
		nullable: false,
	})
	public discordAccessToken?: string;

	@Column({
		name: "discord_refresh_token",
		nullable: false,
	})
	public discordRefreshToken?: string;

	@Column({
		name: "discord_expiration_date",
		nullable: false,
	})
	public discordExpirationDate?: Date;

	@CreateDateColumn({
		name: "created_at",
		nullable: false,
	})
	public createdAt: Date;

	@UpdateDateColumn({
		name: "updated_at",
		nullable: false,
	})
	public updatedAt: Date;

	@OneToOne(() => UserEntity, user => user.github)
	@JoinColumn({
		name: "user_id",
	})
	public user: UserEntity;
}

export type DiscordType = Omit<DiscordEntity, DefaultOmitEntityFields | "user">;

export type DiscordRepository = Repository<DiscordEntity>;

export type DiscordFindMany = FindManyOptions<DiscordEntity>;

export type DiscordFindOne = FindOneOptions<DiscordEntity>;
