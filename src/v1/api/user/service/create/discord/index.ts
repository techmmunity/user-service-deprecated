import { formatData } from "../helpers/format-data";
import { removeSensiveDataFromUser } from "../helpers/remove-sensive-data-from-user";

import { validate } from "./validation";

import { BaseCreateUser, BaseInjectables } from "../types";

export interface CreateDiscordParams extends BaseCreateUser {
	discordUserId: string;
	discordAccessToken: string;
	discordRefreshToken: string;
	discordTokenExpirationDate: Date;
}

type InjectablesDiscord = BaseInjectables;

export const createDiscord = async (
	{ UserRepository }: InjectablesDiscord,
	params: CreateDiscordParams,
) => {
	await validate(params);

	const userData = formatData(params);

	const user = await UserRepository.save(userData);

	// const {
	// 	discordAccessToken,
	// 	discordRefreshToken,
	// 	discordTokenExpirationDate,
	// } = params;

	// const { verificationCode } = await createRelations({
	// 	userId,
	// 	userTokenData: {
	// 		type: IntegrationsEnum.DISCORD,
	// 		accessToken: discordAccessToken,
	// 		refreshToken: discordRefreshToken,
	// 		expirationDate: discordTokenExpirationDate,
	// 	},
	// });

	const userWithoutSensiveData = removeSensiveDataFromUser(user);

	return {
		user: userWithoutSensiveData,
	};
};
