import { typeValidation } from "../../validation/type-validation";
import { ValidationUtil } from "utils/validation";

import { ErrorUtil } from "utils/error";

import { CreateDiscordParams } from "..";

export const typeValidationDiscord = (params: CreateDiscordParams) => {
	typeValidation(params);

	const {
		discordUserId,
		discordAccessToken,
		discordRefreshToken,
		discordTokenExpirationDate,
	} = params;

	if (ValidationUtil.invalidString(discordUserId)) {
		ErrorUtil.badRequest("INVALID_DISCORD_USER_ID");
	}
	if (ValidationUtil.invalidString(discordAccessToken)) {
		ErrorUtil.badRequest("INVALID_DISCORD_ACCESS_TOKEN");
	}
	if (ValidationUtil.invalidString(discordRefreshToken)) {
		ErrorUtil.badRequest("INVALID_DISCORD_REFRESH_TOKEN");
	}
	if (ValidationUtil.invalidDate(discordTokenExpirationDate)) {
		ErrorUtil.badRequest("INVALID_DISCORD_TOKEN_EXPIRATION_DATE");
	}
};
