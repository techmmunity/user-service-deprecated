import { Field, HideField, ID, ObjectType } from "@nestjs/graphql";
import {
	BaseEntity,
	Column,
	Entity,
	ObjectIdColumn,
	ObjectID,
	CreateDateColumn,
	UpdateDateColumn,
	Repository,
	FindManyOptions,
	FindOneOptions,
} from "typeorm";

import { HeadlineEnum } from "core/enums/headline";
import { LanguageEnum } from "core/enums/language";
import { PermissionsEnum } from "core/enums/permissions";

import { EntityType } from "types/entity";

@ObjectType()
@Entity({ name: "users" })
export class UserEntity extends BaseEntity {
	@Field(() => ID)
	@ObjectIdColumn()
	public _id: ObjectID;

	@Column()
	public discordUserId?: string;

	@Column()
	public googleUserId?: string;

	@Column()
	public githubUserId?: string;

	@Column()
	public linkedinUserId?: string;

	@Column()
	public email: string;

	@HideField()
	@Column()
	public password: string;

	@Column()
	public username: string;

	@Column()
	public avatar?: string;

	@Column()
	public name: string;

	@Column()
	public surnames: string;

	@Column()
	public verified: boolean;

	@Field(() => HeadlineEnum)
	@Column()
	public headline?: HeadlineEnum;

	@Field(() => [PermissionsEnum])
	@Column()
	public permissions: Array<PermissionsEnum>;

	@Field(() => [LanguageEnum])
	@Column()
	public languages: Array<LanguageEnum>;

	@Column()
	public birthday: Date;

	@CreateDateColumn()
	public createdAt: Date;

	@UpdateDateColumn()
	public updatedAt: Date;
}

export type UserType = EntityType<UserEntity>;

export type UserRepository = Repository<UserEntity>;

export type UserFindMany = FindManyOptions<UserEntity>;

export type UserFindOne = FindOneOptions<UserEntity>;