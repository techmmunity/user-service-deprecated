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

import { GameficationLogEnum } from "types/enums/gamefication-log";

import { EntityType } from "types/entity";

@ObjectType()
@Entity("gamefication_logs")
export class GameficationLogEntity extends BaseEntity {
	@Field(() => ID)
	@ObjectIdColumn()
	public _id: ObjectID;

	@Column()
	public userId: string;

	@Field(() => GameficationLogEnum)
	@Column()
	public reason: GameficationLogEnum;

	@Column()
	public levelUps?: number;

	@Column()
	public xp?: number;

	@Column()
	public bytes?: number;

	@Column()
	public megabytes?: number;

	@CreateDateColumn()
	public createdAt: Date;
}

export type GameficationLogType = EntityType<GameficationLogEntity>;

export type GameficationLogRepository = Repository<GameficationLogEntity>;

export type GameficationLogFindMany = FindManyOptions<GameficationLogEntity>;

export type GameficationLogFindOne = FindOneOptions<GameficationLogEntity>;
