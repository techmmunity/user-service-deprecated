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

@Entity("googles")
export class GoogleEntity extends BaseEntity {
	@PrimaryColumn({
		name: "google_user_id",
		length: Limits.ids.random.length,
		nullable: false,
		unique: true,
	})
	public googleUserId?: string;

	@Column({
		name: "user_id",
		nullable: false,
		unique: true,
	})
	public userId: string;

	@Column({
		name: "google_access_token",
		nullable: false,
	})
	public googleAccessToken?: string;

	@Column({
		name: "google_refresh_token",
		nullable: false,
	})
	public googleRefreshToken?: string;

	@Column({
		name: "google_expiration_date",
		nullable: false,
	})
	public googleExpirationDate?: Date;

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

	@OneToOne(() => UserEntity, user => user.google)
	@JoinColumn({
		name: "user_id",
	})
	public user: UserEntity;
}

export type GoogleType = Omit<GoogleEntity, DefaultOmitEntityFields | "user">;

export type GoogleRepository = Repository<GoogleEntity>;

export type GoogleFindMany = FindManyOptions<GoogleEntity>;

export type GoogleFindOne = FindOneOptions<GoogleEntity>;
