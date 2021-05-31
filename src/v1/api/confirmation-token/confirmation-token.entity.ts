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

import { ContactEntity } from "../contact/contact.entity";
import { UserEntity } from "../user/user.entity";

import {
	ConfirmationTokenTypeEnum,
	ConfirmationTokenTypeValues,
} from "core/enums/confirmation-token-type";

import { LIMITS } from "v1/config/limits";

import { DefaultOmitEntityFields } from "types/entity";

@Entity("confirmation_tokens")
export class ConfirmationTokenEntity extends BaseEntity {
	/**
	 * It can't be the same as token,
	 * because tokens can be duplicated
	 */
	@PrimaryColumn({
		length: LIMITS.ids.uuid.length,
	})
	public id: string;

	@Column({
		name: "user_id",
		length: LIMITS.ids.uuid.length,
		nullable: true,
	})
	public userId?: string;

	@Column({
		name: "contact_id",
		length: LIMITS.ids.uuid.length,
		nullable: true,
	})
	public contactId?: string;

	@Column({
		nullable: false,
		enum: ConfirmationTokenTypeValues(),
	})
	public type: ConfirmationTokenTypeEnum;

	@Index()
	@Column({
		nullable: false,
		length: LIMITS.confirmationToken.token.length,
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

	@ManyToOne(() => UserEntity, user => user.confirmationTokens, {
		nullable: true,
	})
	@JoinColumn({
		name: "user_id",
	})
	public user?: UserEntity;

	@ManyToOne(() => ContactEntity, contact => contact.confirmationTokens, {
		nullable: true,
	})
	@JoinColumn({
		name: "contact_id",
	})
	public contact?: ContactEntity;
}

export type ConfirmationTokenType = Omit<
	ConfirmationTokenEntity,
	DefaultOmitEntityFields | "user"
>;

export type ConfirmationTokenRepository = Repository<ConfirmationTokenEntity>;

export type ConfirmationTokenFindMany =
	FindManyOptions<ConfirmationTokenEntity>;

export type ConfirmationTokenFindOne = FindOneOptions<ConfirmationTokenEntity>;
