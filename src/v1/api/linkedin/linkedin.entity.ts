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
	OneToOne,
	JoinColumn,
} from "typeorm";

import { UserEntity } from "../user/user.entity";

import { Limits } from "v1/config/limits";

import { DefaultOmitEntityFields } from "types/entity";

@Entity("linkedins")
export class LinkedinEntity extends BaseEntity {
	@PrimaryColumn({
		name: "linkedin_user_id",
		length: Limits.ids.random.max,
		nullable: false,
		unique: true,
	})
	public linkedinUserId?: string;

	@Column({
		name: "user_id",
		nullable: false,
		unique: true,
	})
	public userId: string;

	@Column({
		name: "linkedin_username",
		length: Limits.linkedin.username.max,
		nullable: false,
	})
	public linkedinUsername: string;

	@Column({
		name: "linkedin_access_token",
		nullable: false,
	})
	public linkedinAccessToken?: string;

	@Column({
		name: "linkedin_refresh_token",
		nullable: false,
	})
	public linkedinRefreshToken?: string;

	@Column({
		name: "linkedin_expiration_date",
		nullable: false,
	})
	public linkedinExpirationDate?: Date;

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

	@OneToOne(() => UserEntity, user => user.linkedin)
	@JoinColumn({
		name: "user_id",
	})
	public user: UserEntity;
}

export type LinkedinType = Omit<
	LinkedinEntity,
	DefaultOmitEntityFields | "user"
>;

export type LinkedinRepository = Repository<LinkedinEntity>;

export type LinkedinFindMany = FindManyOptions<LinkedinEntity>;

export type LinkedinFindOne = FindOneOptions<LinkedinEntity>;
