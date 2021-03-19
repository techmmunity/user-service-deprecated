import { SettingsService } from "api/settings/settings.service";
import { TutorialService } from "api/tutorial/tutorial.service";
import { UserTokenService } from "api/user-token/user-token.service";
import { VerifyAccountService } from "api/verify-account/verify-account.service";

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
	VerifyAccountService: VerifyAccountService;
	userId: string;
	suggestedLanguage?: LanguageEnum;
	userTokenData?: UserTokenData;
}

export const createRelations = async ({
	TutorialService,
	SettingsService,
	UserTokenService,
	VerifyAccountService,
	userId,
	suggestedLanguage,
	userTokenData = {} as UserTokenData,
}: CreateRelationsParams) => {
	const [tutorial, settings, verificationCode] = await Promise.all([
		TutorialService.create({ userId }),
		SettingsService.create({
			userId,
			language: suggestedLanguage,
		}),
		VerifyAccountService.create(userId),
		UserTokenService.create({
			userId,
			...userTokenData,
		}),
	]);

	return {
		tutorial,
		settings,
		verificationCode,
	};
};
