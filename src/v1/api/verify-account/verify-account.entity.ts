import {
	BaseEntity,
	Column,
	Entity,
	Repository,
	FindManyOptions,
	FindOneOptions,
	CreateDateColumn,
	PrimaryColumn,
	OneToOne,
	JoinColumn,
} from "typeorm";

import { UserEntity } from "../user/user.entity";

import { Limits } from "v1/config/limits";

import { DefaultOmitEntityFields } from "types/entity";

@Entity("verify_accounts")
export class VerifyAccountEntity extends BaseEntity {
	@PrimaryColumn()
	public id: string;

	@Column({
		name: "user_id",
		nullable: false,
		unique: true,
	})
	public userId: string;

	@Column({
		name: "verification_code",
		nullable: false,
		length: Limits.verifyAccount.code.length,
	})
	public verificationCode: string;

	@Column({
		name: "verified_at",
		nullable: true,
	})
	public verifiedAt?: Date;

	@CreateDateColumn({
		name: "created_at",
		nullable: false,
	})
	public createdAt: Date;

	@OneToOne(() => UserEntity, user => user.verifyAccount)
	@JoinColumn({
		name: "user_id",
	})
	public user: UserEntity;
}

export type VerifyAccountType = Omit<
	VerifyAccountEntity,
	DefaultOmitEntityFields | "user"
>;

export type VerifyAccountRepository = Repository<VerifyAccountEntity>;

export type VerifyAccountFindMany = FindManyOptions<VerifyAccountEntity>;

export type VerifyAccountFindOne = FindOneOptions<VerifyAccountEntity>;
