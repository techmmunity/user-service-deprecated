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

import { ContactEntity } from "../contact/contact.entity";
import { DiscordEntity } from "../discord/discord.entity";
import { GithubEntity } from "../github/github.entity";
import { GoogleEntity } from "../google/google.entity";
import { LinkedinEntity } from "../linkedin/linkedin.entity";

import { HeadlineEnum, HeadlineValues } from "core/enums/headline";

import { Limits } from "v1/config/limits";

import { DefaultOmitEntityFields } from "types/entity";

@Entity("users")
export class UserEntity extends BaseEntity {
	@PrimaryColumn({
		length: Limits.ids.uuid.length,
	})
	public id: string;

	@Column({
		length: Limits.user.username.max,
		nullable: false,
		unique: true,
	})
	public username: string;

	@Index()
	@Column({
		nullable: true,
		enum: HeadlineValues(),
	})
	public headline: HeadlineEnum;

	@Column({
		length: Limits.user.pin.length,
		nullable: false,
	})
	public pin: string;

	@Column({
		name: "verified_at",
		nullable: true,
	})
	public verifiedAt?: Date;

	@Column({
		name: "full_name",
		length: Limits.user.fullName.max,
		nullable: false,
	})
	public fullName?: string;

	@Column({
		nullable: true,
	})
	public birthday?: Date;

	@Column({
		length: 200,
		nullable: true,
	})
	public password?: string;

	@Column({
		length: Limits.user.avatar.max,
		nullable: true,
	})
	public avatar?: string;

	@Column({
		length: Limits.user.youtube.max,
		nullable: true,
	})
	public youtube?: string;

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
		cascade: true,
	})
	public discord: DiscordEntity;

	@OneToOne(() => GithubEntity, github => github.user, {
		cascade: true,
	})
	public github: GithubEntity;

	@OneToOne(() => GoogleEntity, google => google.user, {
		cascade: true,
	})
	public google: GoogleEntity;

	@OneToOne(() => LinkedinEntity, linkedin => linkedin.user, {
		cascade: true,
	})
	public linkedin: LinkedinEntity;

	@OneToMany(() => ContactEntity, contact => contact.user, {
		cascade: true,
	})
	public contacts: Array<ContactEntity>;
}

export type UserType = Omit<
	UserEntity,
	| DefaultOmitEntityFields
	| "verifyAccount"
	| "discord"
	| "github"
	| "google"
	| "linkedin"
	| "contacts"
>;

export type UserRepository = Repository<UserEntity>;

export type UserFindMany = FindManyOptions<UserEntity>;

export type UserFindOne = FindOneOptions<UserEntity>;
