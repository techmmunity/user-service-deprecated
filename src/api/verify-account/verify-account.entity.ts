import { Field, ID, ObjectType } from "@nestjs/graphql";
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

@ObjectType()
@Entity("verify_account")
export class VerifyAccountEntity extends BaseEntity {
	@Field(() => ID)
	@ObjectIdColumn()
	public _id: ObjectID;

	@Column()
	public userId: string;

	@Column()
	public confirmationCode: string;

	@CreateDateColumn()
	public createdAt: Date;
}

export type VerifyAccountType = EntityType<VerifyAccountEntity>;

export type VerifyAccountRepository = Repository<VerifyAccountEntity>;

export type VerifyAccountFindMany = FindManyOptions<VerifyAccountEntity>;

export type VerifyAccountFindOne = FindOneOptions<VerifyAccountEntity>;
