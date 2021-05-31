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
	ManyToOne,
	JoinColumn,
	OneToMany,
} from "typeorm";

import { ConfirmationTokenEntity } from "../confirmation-token/confirmation-token.entity";
import { UserEntity } from "../user/user.entity";

import { ContactTypeEnum, ContactTypeValues } from "core/enums/contact-type";

import { LIMITS } from "v1/config/limits";

import { DefaultOmitEntityFields } from "types/entity";

@Entity("contacts")
export class ContactEntity extends BaseEntity {
	/**
	 * It can't be the same as value,
	 * because if someone tries to add another
	 * contact with the same value, it won't throw
	 * an error, but updates the record
	 */
	@PrimaryColumn({
		length: LIMITS.ids.uuid.length,
	})
	public id: string;

	@Column({
		name: "user_id",
		length: LIMITS.ids.uuid.length,
		nullable: false,
	})
	public userId: string;

	@Column({
		nullable: false,
		enum: ContactTypeValues(),
	})
	public type: ContactTypeEnum;

	@Column({
		nullable: false,
		default: false,
	})
	public primary: boolean;

	@Column({
		nullable: false,
		default: false,
	})
	public verified: boolean;

	@Index()
	@Column({
		nullable: false,
		unique: true,
	})
	public value: string;

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

	@ManyToOne(() => UserEntity, user => user.contacts)
	@JoinColumn({
		name: "user_id",
	})
	public user: UserEntity;

	@OneToMany(
		() => ConfirmationTokenEntity,
		confirmationToken => confirmationToken.user,
		{
			cascade: true,
		},
	)
	public confirmationTokens: Array<ConfirmationTokenEntity>;
}

export type ContactType = Omit<ContactEntity, DefaultOmitEntityFields | "user">;

export type ContactRepository = Repository<ContactEntity>;

export type ContactFindMany = FindManyOptions<ContactEntity>;

export type ContactFindOne = FindOneOptions<ContactEntity>;
