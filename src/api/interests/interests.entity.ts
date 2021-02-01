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

@Entity("interests")
export class InterestsEntity extends BaseEntity {
	@ObjectIdColumn()
	public _id: ObjectID;

	@Column()
	public code: string;

	@Column()
	public imageUrl: string;

	@Column()
	public name: string;

	@Column()
	public type: string;

	@Column()
	public description: string;
}

export type InterestsType = EntityType<InterestsEntity>;

export type InterestsRepository = Repository<InterestsEntity>;

export type InterestsFindMany = FindManyOptions<InterestsEntity>;

export type InterestsFindOne = FindOneOptions<InterestsEntity>;
