import {
	BaseEntity,
	Column,
	Entity,
	Repository,
	FindManyOptions,
	FindOneOptions,
	PrimaryColumn,
} from "typeorm";

import { LanguageEnum, LanguageValues } from "core/enums/language";
import { ThemeEnum, ThemeValues } from "core/enums/theme";

import { EntityType } from "types/entity";

@Entity("settings")
export class SettingsEntity extends BaseEntity {
	@PrimaryColumn({
		nullable: false,
	})
	public id: string;

	@Column({
		type: "enum",
		enum: ThemeValues(),
		nullable: false,
		default: ThemeEnum.DARK,
	})
	public theme: ThemeEnum;

	@Column({
		type: "enum",
		enum: LanguageValues(),
		nullable: false,
		default: LanguageEnum.EN,
	})
	public language: LanguageEnum;
}

export type SettingsType = EntityType<SettingsEntity>;

export type SettingsRepository = Repository<SettingsEntity>;

export type SettingsFindMany = FindManyOptions<SettingsEntity>;

export type SettingsFindOne = FindOneOptions<SettingsEntity>;
