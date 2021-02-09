import { createRelations } from "../helpers/create-relations";
import { formatData } from "../helpers/format-data";
import { removeSensiveDataFromUser } from "../helpers/remove-sensive-data-from-user";

import { duplicatedValidation } from "../validation/duplicated-validation";
import { businessValidationDiscord } from "./validation/business-validation";
import { typeValidationDiscord } from "./validation/type-validation";

import { TimeUtil } from "utils/time";

import { IntegrationsEnum } from "core/enums/integrations";

import { BaseCreateUser, BaseInjectables } from "../types";

export interface CreateDiscordParams extends BaseCreateUser {
	discordUserId: string;
	discordAccessToken: string;
	discordRefreshToken: string;
	discordTokenExpirationDate: Date;
}

type InjectablesDiscord = BaseInjectables;

export const createDiscord = async (
	params: CreateDiscordParams & InjectablesDiscord,
) => {
	typeValidationDiscord(params);

	businessValidationDiscord(params);

	const {
		UserRepository,
		UserTokenService,
		SettingsService,
		TutorialService,
		...unformattedData
	} = params;

	await duplicatedValidation({
		UserRepository,
		username: unformattedData.username,
		email: unformattedData.email,
		extraConditions: {
			discordUserId: unformattedData.discordUserId,
		},
	});

	const userData = formatData(unformattedData);

	const user = await UserRepository.save(userData);

	const userId = user.id;

	const {
		suggestedLanguage,
		discordAccessToken,
		discordRefreshToken,
		discordTokenExpirationDate,
	} = unformattedData;

	const { tutorial, settings } = await createRelations({
		TutorialService,
		SettingsService,
		UserTokenService,
		userId,
		suggestedLanguage,
		userTokenData: {
			type: IntegrationsEnum.DISCORD,
			accessToken: discordAccessToken,
			refreshToken: discordRefreshToken,
			expirationDate: TimeUtil.newDate(discordTokenExpirationDate),
		},
	});

	const userWithoutSensiveData = removeSensiveDataFromUser(user);

	return {
		user: userWithoutSensiveData,
		tutorial,
		settings,
	};
};
