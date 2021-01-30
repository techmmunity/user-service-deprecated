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

@ObjectType()
export class CardUser {
	@Column()
	public cardCode: string;

	@Column()
	public currentProgress?: number;

	@Column()
	public necessaryToAchieve?: number;
}

@ObjectType()
@Entity("gamefications")
export class GameficationEntity extends BaseEntity {
	@Field(() => ID)
	@ObjectIdColumn()
	public _id: ObjectID;

	@Column()
	public userId: string;

	@Column()
	public level: number;

	@Column() // XP for the current level, is reset when level up
	public xp: number;

	@Column()
	public bytes: number;

	@Column()
	public megabytes: number;

	@Column() // Total XP, is never reseted
	public totalXp: number;

	@Column() // Total Bytes, is never subtracted
	public totalBytes: number;

	@Column() // Total Megabytes, is never subtracted
	public totalMegabytes: number;

	@Field(() => CardUser)
	@Column()
	public cards: Array<CardUser>;
}

export type GameficationType = EntityType<GameficationEntity>;

export type GameficationRepository = Repository<GameficationEntity>;

export type GameficationFindMany = FindManyOptions<GameficationEntity>;

export type GameficationFindOne = FindOneOptions<GameficationEntity>;
