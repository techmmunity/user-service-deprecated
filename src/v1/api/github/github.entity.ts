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

@Entity("githubs")
export class GithubEntity extends BaseEntity {
	@PrimaryColumn({
		name: "user_id",
	})
	public userId: string;

	@Column({
		name: "github_user_id",
		length: Limits.ids.random.length,
		nullable: false,
		unique: true,
	})
	public githubUserId?: string;

	@Column({
		name: "github_username",
		length: Limits.github.username.max,
		nullable: false,
	})
	public githubUsername: string;

	@Column({
		name: "github_access_token",
		nullable: false,
	})
	public githubAccessToken?: string;

	@Column({
		name: "github_refresh_token",
		nullable: false,
	})
	public githubRefreshToken?: string;

	@Column({
		name: "github_expiration_date",
		nullable: false,
	})
	public githubExpirationDate?: Date;

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

	@OneToOne(() => UserEntity, user => user.github, {
		primary: true,
	})
	@JoinColumn({
		name: "user_id",
	})
	public user: UserEntity;
}

export type GithubType = Omit<GithubEntity, DefaultOmitEntityFields | "user">;

export type GithubRepository = Repository<GithubEntity>;

export type GithubFindMany = FindManyOptions<GithubEntity>;

export type GithubFindOne = FindOneOptions<GithubEntity>;
