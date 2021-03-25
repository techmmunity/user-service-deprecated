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
} from "typeorm";

import { DiscordEntity } from "../discord/discord.entity";
import { GithubEntity } from "../github/github.entity";
import { GoogleEntity } from "../google/google.entity";
import { LinkedinEntity } from "../linkedin/linkedin.entity";
import { VerifyAccountEntity } from "../verify-account/verify-account.entity";

import { HeadlineEnum, HeadlineValues } from "core/enums/headline";

import { Limits } from "v1/config/limits";

import { DefaultOmitEntityFields } from "types/entity";

@Entity({ name: "users" })
export class UserEntity extends BaseEntity {
	@PrimaryColumn({
		length: Limits.ids.uuid.max,
	})
	public id: string;

	@Column({
		length: Limits.user.email.max,
		nullable: false,
		unique: true,
	})
	public email: string;

	@Column({
		length: 200,
		nullable: false,
	})
	public password: string;

	@Column({
		length: Limits.user.username.max,
		nullable: false,
		unique: true,
	})
	public username: string;

	@Column({
		length: Limits.user.name.max,
		nullable: false,
	})
	public name: string;

	@Column({
		length: Limits.user.surnames.max,
		nullable: false,
	})
	public surnames: string;

	@Column({
		length: Limits.user.pin.max,
		nullable: false,
	})
	public pin: string;

	@Column({
		length: Limits.user.avatar.max,
		nullable: true,
	})
	public avatar?: string;

	@Index()
	@Column({
		nullable: false,
		enum: HeadlineValues(),
	})
	public headline: HeadlineEnum;

	@Column({
		nullable: false,
	})
	public birthday: Date;

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

	@OneToOne(() => VerifyAccountEntity, verifyAccount => verifyAccount.user)
	public verifyAccount: VerifyAccountEntity;

	@OneToOne(() => DiscordEntity, discord => discord.user)
	public discord: DiscordEntity;

	@OneToOne(() => GithubEntity, github => github.user)
	public github: GithubEntity;

	@OneToOne(() => GoogleEntity, google => google.user)
	public google: GoogleEntity;

	@OneToOne(() => LinkedinEntity, linkedin => linkedin.user)
	public linkedin: LinkedinEntity;
}

export type UserType = Omit<UserEntity, DefaultOmitEntityFields | "user">;

export type UserRepository = Repository<UserEntity>;

export type UserFindMany = FindManyOptions<UserEntity>;

export type UserFindOne = FindOneOptions<UserEntity>;
