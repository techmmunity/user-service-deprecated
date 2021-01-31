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

@Entity("user_tokens")
export class UserTokenEntity extends BaseEntity {
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
