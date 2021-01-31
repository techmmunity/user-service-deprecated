import {
	BaseEntity,
	Column,
	Entity,
	ObjectIdColumn,
	ObjectID,
	Repository,
	FindManyOptions,
	FindOneOptions,
	CreateDateColumn,
} from "typeorm";

import { EntityType } from "types/entity";

@Entity("verify_account")
export class VerifyAccountEntity extends BaseEntity {
	@ObjectIdColumn()
	public _id: ObjectID;

	@Column()
	public userId: string;

	@Column()
	public verificationCode: string;

	@Column()
	public verifiedAt?: Date;

	@CreateDateColumn()
	public createdAt: Date;
}

export type VerifyAccountType = EntityType<VerifyAccountEntity>;

export type VerifyAccountRepository = Repository<VerifyAccountEntity>;

export type VerifyAccountFindMany = FindManyOptions<VerifyAccountEntity>;

export type VerifyAccountFindOne = FindOneOptions<VerifyAccountEntity>;
