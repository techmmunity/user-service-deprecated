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
} from "typeorm";

import { EntityType } from "types/entity";

interface ITokenData {
	accessToken: string;
	refreshToken: string;
	expirationDate: Date;
}

@ObjectType()
@Entity("user_tokens")
export class UserTokenEntity extends BaseEntity {
	@Field(() => ID)
	@ObjectIdColumn()
	public _id: ObjectID;

	@Column()
	public userId: string;

	@Column()
	public discord?: ITokenData;

	@Column()
	public google?: ITokenData;

	@Column()
	public github?: ITokenData;

	@Column()
	public linkedin?: ITokenData;
}

export type UserTokenType = EntityType<UserTokenEntity>;

export type UserTokenRepository = Repository<UserTokenEntity>;

export type UserTokenFindMany = FindManyOptions<UserTokenEntity>;

export type UserTokenFindOne = FindOneOptions<UserTokenEntity>;
