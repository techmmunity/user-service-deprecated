import { validate } from "./validation";

import { SettingsRepository } from "v1/api/settings/settings.entity";

import { LanguageEnum } from "core/enums/language";
import { ThemeEnum } from "core/enums/theme";

interface Injectables {
	SettingsRepository: SettingsRepository;
}

export interface UpdateParams {
	userId: string;
	language?: LanguageEnum;
	theme?: ThemeEnum;
}

export const update = async (params: UpdateParams & Injectables) => {
	await validate(params);

	const { SettingsRepository, userId, ...newData } = params;

	return SettingsRepository.save({
		id: userId,
		...newData,
	});
};
