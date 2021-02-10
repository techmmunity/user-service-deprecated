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
} from "typeorm";

import { HeadlineEnum, HeadlineValues } from "core/enums/headline";
import { InterestEnum } from "core/enums/interests";
import { LanguageEnum } from "core/enums/language";
import { PermissionsEnum } from "core/enums/permissions";

import { EntityType } from "types/entity";

@Entity({ name: "users" })
export class UserEntity extends BaseEntity {
	@PrimaryColumn()
	public id: string;

	@Column({
		name: "discord_user_id",
		nullable: true,
	})
	public discordUserId?: string;

	@Column({
		name: "google_user_id",
		nullable: true,
	})
	public googleUserId?: string;

	@Column({
		name: "github_user_id",
		nullable: true,
	})
	public githubUserId?: string;

	@Column({
		name: "linkedin_user_id",
		nullable: true,
	})
	public linkedinUserId?: string;

	@Column({
		nullable: false,
	})
	public email: string;

	@Column({
		nullable: false,
	})
	public password: string;

	@Column({
		nullable: false,
	})
	public username: string;

	@Column({
		nullable: false,
	})
	public name: string;

	@Column({
		nullable: false,
	})
	public surnames: string;

	@Column({
		nullable: false,
	})
	public pin: string;

	@Column({
		nullable: true,
	})
	public avatar?: string;

	@Column({
		nullable: false,
		default: false,
	})
	public verified: boolean;

	@Index()
	@Column({
		nullable: false,
		enum: HeadlineValues(),
	})
	public headline: HeadlineEnum;

	@Column({
		type: "jsonb",
		nullable: false,
	})
	public permissions: Array<PermissionsEnum>;

	@Column({
		type: "jsonb",
		nullable: false,
	})
	public languages: Array<LanguageEnum>;

	@Column({
		type: "jsonb",
		nullable: false,
	})
	public interests: Array<InterestEnum>;

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
}

export type UserType = EntityType<UserEntity>;

export type UserRepository = Repository<UserEntity>;

export type UserFindMany = FindManyOptions<UserEntity>;

export type UserFindOne = FindOneOptions<UserEntity>;
