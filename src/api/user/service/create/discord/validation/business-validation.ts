import { businessValidation } from "../../validation/business-validation";

import { ErrorUtil } from "utils/error";

import { CreateDiscordParams } from "..";

import { TimeUtil } from "utils/time";

const invalidExpirationDate = (discordTokenExpirationDate: Date) => {
	const now = TimeUtil.newDate();

	return discordTokenExpirationDate.getTime() >= now.getTime();
};

export const businessValidationDiscord = ({
	discordUserId,
	discordAccessToken,
	discordRefreshToken,
	discordTokenExpirationDate,
	...params
}: CreateDiscordParams) => {
	businessValidation(params);

	if (invalidExpirationDate(discordTokenExpirationDate)) {
		ErrorUtil.badRequest("INVALID_EXPIRATION_TOKEN");
	}
};
