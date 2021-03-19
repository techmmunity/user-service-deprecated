import {
	BaseEntity,
	Column,
	Entity,
	Repository,
	FindManyOptions,
	FindOneOptions,
	CreateDateColumn,
	PrimaryColumn,
} from "typeorm";

import { EntityType } from "types/entity";

@Entity("verify_account")
export class VerifyAccountEntity extends BaseEntity {
	@PrimaryColumn()
	public id: string;

	@Column({
		name: "verification_code",
		nullable: false,
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
}

export type VerifyAccountType = EntityType<VerifyAccountEntity>;

export type VerifyAccountRepository = Repository<VerifyAccountEntity>;

export type VerifyAccountFindMany = FindManyOptions<VerifyAccountEntity>;

export type VerifyAccountFindOne = FindOneOptions<VerifyAccountEntity>;
