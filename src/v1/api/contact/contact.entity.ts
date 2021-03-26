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
	Unique,
} from "typeorm";

import { UserEntity } from "../user/user.entity";

import { ContactTypeEnum, ContactTypeValues } from "core/enums/contact-type";

import { Limits } from "v1/config/limits";

import { DefaultOmitEntityFields } from "types/entity";

@Entity("contacts")
@Unique(["userId", "type", "primary"])
export class ContactEntity extends BaseEntity {
	@PrimaryColumn({
		length: Limits.ids.uuid.length,
	})
	public id: string;

	@Index()
	@Column({
		length: Limits.ids.uuid.length,
		nullable: false,
	})
	public userId: string;

	@Index()
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
