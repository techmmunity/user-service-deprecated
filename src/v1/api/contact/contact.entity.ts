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
} from "typeorm";

import { UserEntity } from "../user/user.entity";

import { ContactTypeEnum, ContactTypeValues } from "core/enums/contact-type";

import { Limits } from "v1/config/limits";

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
		enum: ContactTypeValues(),
	})
	public type: ContactTypeEnum;

	@Column({
		nullable: false,
		default: false,
	})
	public primary: boolean;

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
}

export type ContactType = Omit<ContactEntity, DefaultOmitEntityFields | "user">;

export type ContactRepository = Repository<ContactEntity>;

export type ContactFindMany = FindManyOptions<ContactEntity>;

export type ContactFindOne = FindOneOptions<ContactEntity>;
