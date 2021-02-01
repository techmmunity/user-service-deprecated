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
export class SettingsEntity extends BaseEntity {
	@ObjectIdColumn()
	public _id: ObjectID;

	@Column()
	public userId: string;

	@Column()
	public theme: ThemeEnum;

	@Column()
	public language: LanguageEnum;
}

export type SettingsType = EntityType<SettingsEntity>;

export type SettingsRepository = Repository<SettingsEntity>;

export type SettingsFindMany = FindManyOptions<SettingsEntity>;

export type SettingsFindOne = FindOneOptions<SettingsEntity>;
