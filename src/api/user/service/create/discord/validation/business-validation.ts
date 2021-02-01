import { businessValidation } from "../../validation/business-validation";

import { ErrorUtil } from "utils/error";

import { CreateDiscordParams } from "..";

import { TimeUtil } from "utils/time";

const invalidExpirationDate = (discordTokenExpirationDate: number) => {
	const expirationDate = TimeUtil.newDate(discordTokenExpirationDate);
	const now = TimeUtil.newDate();

	return expirationDate.getTime() >= now.getTime();
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
