import { createRelations } from "../helpers/create-relations";
import { formatData } from "../helpers/format-data";
import { removeSensiveDataFromUser } from "../helpers/remove-sensive-data-from-user";

import { validate } from "./validation";

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
	await validate(params);

	const {
		UserRepository,
		UserTokenService,
		VerifyAccountService,
		...unformattedData
	} = params;

	const userData = formatData(unformattedData);

	const user = await UserRepository.save(userData);

	const userId = user.id;

	const {
		discordAccessToken,
		discordRefreshToken,
		discordTokenExpirationDate,
	} = unformattedData;

	const { verificationCode } = await createRelations({
		UserTokenService,
		VerifyAccountService,
		userId,
		userTokenData: {
			type: IntegrationsEnum.DISCORD,
			accessToken: discordAccessToken,
			refreshToken: discordRefreshToken,
			expirationDate: discordTokenExpirationDate,
		},
	});

	const userWithoutSensiveData = removeSensiveDataFromUser(user);

	return {
		user: userWithoutSensiveData,
		verificationCode,
	};
};
