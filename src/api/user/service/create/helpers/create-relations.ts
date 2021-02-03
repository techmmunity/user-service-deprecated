import { SettingsService } from "api/settings/settings.service";
import { TutorialService } from "api/tutorial/tutorial.service";
import { UserTokenService } from "api/user-token/user-token.service";

import { UserTokenType } from "api/user-token/user-token.entity";

import { LanguageEnum } from "core/enums/language";

export interface CreateRelationsParams {
	TutorialService: TutorialService;
	SettingsService: SettingsService;
	UserTokenService: UserTokenService;
	userId: string;
	suggestedLanguage?: LanguageEnum;
	userTokenData?: Omit<UserTokenType, "userId">;
}

export const createRelations = async ({
	TutorialService,
	SettingsService,
	UserTokenService,
	userId,
	suggestedLanguage,
	userTokenData = {},
}: CreateRelationsParams) => {
	const [tutorial, settings] = await Promise.all([
		TutorialService.create({ userId }),
		SettingsService.create({
			userId,
			language: suggestedLanguage,
		}),
		UserTokenService.create({
			userId,
			...userTokenData,
		}),
	]);

	return {
		tutorial,
		settings,
	};
};