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

@Entity("settings")
export class SettingEntity extends BaseEntity {
	@ObjectIdColumn()
	public _id: ObjectID;

	@Column()
	public userId: string;

	@Column()
	public theme: ThemeEnum;

	@Column()
	public language: LanguageEnum;
}

export type SettingType = EntityType<SettingEntity>;

export type SettingRepository = Repository<SettingEntity>;

export type SettingFindMany = FindManyOptions<SettingEntity>;

export type SettingFindOne = FindOneOptions<SettingEntity>;
