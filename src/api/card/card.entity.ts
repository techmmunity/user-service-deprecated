import { Field, ObjectType } from "@nestjs/graphql";
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

import { RarityEnum } from "core/enums/rarity";

import { EntityType } from "types/entity";

@ObjectType()
@Entity("cards")
export class CardEntity extends BaseEntity {
	@ObjectIdColumn()
	public _id: ObjectID;

	@Column()
	public code: string;

	@Column()
	public name: string;

	@Column()
	public description: string;

	@Column()
	public imageUrl: string;

	@Column()
	public necessaryToAchieve?: number;

	@Column()
	public priceInGold?: number;

	@Field(() => RarityEnum)
	@Column()
	public rarity: RarityEnum;
}

export type CardType = EntityType<CardEntity>;

export type CardRepository = Repository<CardEntity>;

export type CardFindMany = FindManyOptions<CardEntity>;

export type CardFindOne = FindOneOptions<CardEntity>;
