import * as moment from "moment";

import { DiscordEntity } from "v1/api/discord/discord.entity";

interface UpdateDiscordUserParams {
	userExistant: DiscordEntity;
	discordAccessToken: string;
	discordRefreshToken: string;
	discordExpirationDateMillis: number;
}

export const updateDiscordUser = async ({
	userExistant,
	discordAccessToken,
	discordRefreshToken,
	discordExpirationDateMillis,
}: UpdateDiscordUserParams) => {
	const discordExpirationDate = moment(discordExpirationDateMillis).toDate();

	userExistant.discordAccessToken = discordAccessToken;
	userExistant.discordRefreshToken = discordRefreshToken;
	userExistant.discordExpirationDate = discordExpirationDate;

	await userExistant.save();

	return {
		userId: userExistant.user.id,
		pin: userExistant.user.pin,
	};
};
