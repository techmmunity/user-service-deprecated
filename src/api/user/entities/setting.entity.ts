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

import { LanguageEnum } from "core/enums/language";
import { ThemeEnum } from "core/enums/theme";

import { EntityType } from "types/entity";

@ObjectType()
@Entity("settings")
export class SettingEntity extends BaseEntity {
	@Field(() => ID)
	@ObjectIdColumn()
	public _id: ObjectID;

	@Column()
	public userId: string;

	@Field(() => ThemeEnum)
	@Column()
	public theme: ThemeEnum;

	@Field(() => LanguageEnum)
	@Column()
	public language: LanguageEnum;
}

export type SettingType = EntityType<SettingEntity>;

export type SettingRepository = Repository<SettingEntity>;

export type SettingFindMany = FindManyOptions<SettingEntity>;

export type SettingFindOne = FindOneOptions<SettingEntity>;
