import {
	BaseEntity,
	Column,
	Entity,
	CreateDateColumn,
	Repository,
	FindManyOptions,
	FindOneOptions,
	PrimaryColumn,
	Index,
	ManyToOne,
	JoinColumn,
} from "typeorm";

import { UserEntity } from "../user/user.entity";

import {
	ConfirmationTokenTypeEnum,
	ConfirmationTokenTypeValues,
} from "core/enums/confirmation-token-type";

import { Limits } from "v1/config/limits";

import { DefaultOmitEntityFields } from "types/entity";

@Entity("confirmation_tokens")
export class ConfirmationTokenEntity extends BaseEntity {
	/**
	 * It can't be the same as token,
	 * because tokens can be duplicated
	 */
	@PrimaryColumn({
		length: Limits.ids.uuid.length,
	})
	public id: string;

	@Column({
		name: "user_id",
		length: Limits.ids.uuid.length,
		nullable: false,
	})
	public userId: string;

	@Column({
		nullable: false,
		enum: ConfirmationTokenTypeValues(),
	})
	public type: ConfirmationTokenTypeEnum;

	@Index()
	@Column({
		nullable: false,
		length: Limits.confirmationToken.token.length,
	})
	public token: string;

	@Column({
		name: "used_at",
		nullable: true,
	})
	public usedAt?: Date;

	@CreateDateColumn({
		name: "created_at",
		nullable: false,
	})
	public createdAt: Date;

	@ManyToOne(() => UserEntity, user => user.confirmationTokens)
	@JoinColumn({
		name: "user_id",
	})
	public user: UserEntity;
}

export type ConfirmationTokenType = Omit<
	ConfirmationTokenEntity,
	DefaultOmitEntityFields | "user"
>;

export type ConfirmationTokenRepository = Repository<ConfirmationTokenEntity>;

export type ConfirmationTokenFindMany = FindManyOptions<ConfirmationTokenEntity>;

export type ConfirmationTokenFindOne = FindOneOptions<ConfirmationTokenEntity>;
