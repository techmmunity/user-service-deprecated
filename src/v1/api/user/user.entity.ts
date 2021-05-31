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
	OneToMany,
} from "typeorm";

import { ConfirmationTokenEntity } from "../confirmation-token/confirmation-token.entity";
import { ContactEntity } from "../contact/contact.entity";
import { DiscordEntity } from "../discord/discord.entity";
import { GithubEntity } from "../github/github.entity";
import { GoogleEntity } from "../google/google.entity";
import { LinkedinEntity } from "../linkedin/linkedin.entity";

import { HeadlineEnum, HeadlineValues } from "core/enums/headline";

import { LIMITS } from "v1/config/limits";

import { DefaultOmitEntityFields } from "types/entity";

@Entity("users")
export class UserEntity extends BaseEntity {
	@PrimaryColumn({
		length: LIMITS.ids.uuid.length,
	})
	public id: string;

	@Column({
		length: LIMITS.user.username.max,
		nullable: false,
		unique: true,
	})
	public username: string;

	@Column({
		length: LIMITS.user.pin.length,
		nullable: false,
	})
	public pin: string;

	@Index()
	@Column({
		nullable: true,
		enum: HeadlineValues(),
	})
	public headline?: HeadlineEnum;

	@Column({
		nullable: true,
	})
	public birthday?: Date;

	@Column({
		name: "full_name",
		length: LIMITS.user.fullName.max,
		nullable: true,
	})
	public fullName?: string;

	@Column({
		length: 200,
		nullable: true,
	})
	public password?: string;

	@Column({
		length: LIMITS.user.avatar.max,
		nullable: true,
	})
	public avatar?: string;

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

	@OneToOne(() => DiscordEntity, discord => discord.user, {
		nullable: true,
	})
	public discord?: DiscordEntity;

	@OneToOne(() => GithubEntity, github => github.user, {
		cascade: true,
		nullable: true,
	})
	public github?: GithubEntity;

	@OneToOne(() => GoogleEntity, google => google.user, {
		cascade: true,
		nullable: true,
	})
	public google?: GoogleEntity;

	@OneToOne(() => LinkedinEntity, linkedin => linkedin.user, {
		cascade: true,
		nullable: true,
	})
	public linkedin?: LinkedinEntity;

	@OneToMany(() => ContactEntity, contact => contact.user, {
		cascade: true,
	})
	public contacts: Array<ContactEntity>;

	@OneToMany(
		() => ConfirmationTokenEntity,
		confirmationToken => confirmationToken.user,
		{
			cascade: true,
		},
	)
	public confirmationTokens: Array<ConfirmationTokenEntity>;
}

export type UserType = Omit<
	UserEntity,
	| DefaultOmitEntityFields
	| "confirmationTokens"
	| "contacts"
	| "discord"
	| "github"
	| "google"
	| "linkedin"
	| "verifyAccount"
>;

export type UserRepository = Repository<UserEntity>;

export type UserFindMany = FindManyOptions<UserEntity>;

export type UserFindOne = FindOneOptions<UserEntity>;
