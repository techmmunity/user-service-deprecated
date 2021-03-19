import { validate } from "./validation";

import {
	SettingsRepository,
	SettingsType,
} from "v1/api/settings/settings.entity";

import { LanguageEnum } from "core/enums/language";
import { ThemeEnum } from "core/enums/theme";

interface Injectables {
	SettingsRepository: SettingsRepository;
}

export interface CreateParams {
	userId: string;
	language?: LanguageEnum;
}

export const create = async (params: CreateParams & Injectables) => {
	await validate(params);

	const { SettingsRepository, userId, language } = params;

	return SettingsRepository.save<SettingsType>({
		id: userId,
		theme: ThemeEnum.DARK,
		language: language || LanguageEnum.EN,
	});
};
