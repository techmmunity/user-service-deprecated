import { createRelations } from "../helpers/create-relations";
import { formatData } from "../helpers/format-data";
import { removeSensiveDataFromUser } from "../helpers/remove-sensive-data-from-user";

import { duplicatedValidation } from "../validation/duplicated-validation";
import { businessValidationDiscord } from "./validation/business-validation";
import { typeValidationDiscord } from "./validation/type-validation";

import { TimeUtil } from "utils/time";

import { BaseCreateUser, BaseInjectables } from "../types";

export interface CreateDiscordParams extends BaseCreateUser {
	discordUserId: string;
	discordAccessToken: string;
	discordRefreshToken: string;
	discordTokenExpirationDate: number;
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

	const userId = user._id.toHexString();

	const { tutorial, settings } = await createRelations({
		TutorialService,
		SettingsService,
		UserTokenService,
		userId,
		suggestedLanguage: unformattedData.suggestedLanguage,
		userTokenData: {
			discord: {
				accessToken: unformattedData.discordAccessToken,
				refreshToken: unformattedData.discordRefreshToken,
				expirationDate: TimeUtil.newDate(
					unformattedData.discordTokenExpirationDate,
				),
			},
		},
	});

	const userWithoutSensiveData = removeSensiveDataFromUser(user);

	return {
		user: userWithoutSensiveData,
		tutorial,
		settings,
	};
};
