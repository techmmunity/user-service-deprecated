import { businessValidation } from "./validation/business-validation";
import { typeValidation } from "./validation/type-validation";

import { SettingsRepository, SettingsType } from "api/settings/settings.entity";

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
	typeValidation(params);

	businessValidation(params);

	const { SettingsRepository, userId, language } = params;

	return SettingsRepository.save<SettingsType>({
		id: userId,
		theme: ThemeEnum.DARK,
		language: language || LanguageEnum.EN,
	});
};
