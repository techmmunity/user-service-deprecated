import { SettingsService } from "api/settings/settings.service";
import { TutorialService } from "api/tutorial/tutorial.service";
import { UserTokenService } from "api/user-token/user-token.service";

import { IntegrationsEnum } from "core/enums/integrations";
import { LanguageEnum } from "core/enums/language";

interface UserTokenData {
	type: IntegrationsEnum;
	accessToken: string;
	refreshToken: string;
	expirationDate: Date;
}

export interface CreateRelationsParams {
	TutorialService: TutorialService;
	SettingsService: SettingsService;
	UserTokenService: UserTokenService;
	userId: string;
	suggestedLanguage?: LanguageEnum;
	userTokenData?: UserTokenData;
}

export const createRelations = async ({
	TutorialService,
	SettingsService,
	UserTokenService,
	userId,
	suggestedLanguage,
	userTokenData = {} as UserTokenData,
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
