import { ValidationUtil } from "utils/validation";

import { ErrorUtil } from "utils/error";

import { StrategyEnum } from "core/enums/strategy";

import {
	BaseCreateUser,
	CreateUser,
	CreateUserByDiscord,
} from "api/user/service/create/types";

const typeValidationBase = (params: BaseCreateUser) => {
	if (ValidationUtil.invalidObject(params)) {
		ErrorUtil.badRequest("INVALID_PARAMS");
	}

	const {
		email,
		username,
		birthday,
		password,
		fullName,
		avatar,
		suggestedLanguage,
		headline,
	} = params;

	if (ValidationUtil.invalidString(email)) {
		ErrorUtil.badRequest("INVALID_EMAIL");
	}
	if (ValidationUtil.invalidString(username)) {
		ErrorUtil.badRequest("INVALID_USERNAME");
	}
	if (ValidationUtil.invalidString(birthday)) {
		ErrorUtil.badRequest("INVALID_BIRTHDAY");
	}
	if (ValidationUtil.invalidString(password)) {
		ErrorUtil.badRequest("INVALID_PASSWORD");
	}
	if (ValidationUtil.invalidString(fullName)) {
		ErrorUtil.badRequest("INVALID_FULL_NAME");
	}
	if (ValidationUtil.invalidString(avatar, true)) {
		ErrorUtil.badRequest("INVALID_AVATAR");
	}
	if (ValidationUtil.invalidString(suggestedLanguage, true)) {
		ErrorUtil.badRequest("INVALID_SEGGESTED_LANGUAGE");
	}
	if (ValidationUtil.invalidString(headline, true)) {
		ErrorUtil.badRequest("INVALID_HEADLINE");
	}
};

const typeValidationDiscord = ({
	discordUserId,
	discordAccessToken,
	discordRefreshToken,
	discordTokenExpirationDate,
}: CreateUserByDiscord) => {
	if (ValidationUtil.invalidString(discordUserId)) {
		ErrorUtil.badRequest("INVALID_DISCORD_USER_ID");
	}
	if (ValidationUtil.invalidString(discordAccessToken)) {
		ErrorUtil.badRequest("INVALID_DISCORD_ACCESS_TOKEN");
	}
	if (ValidationUtil.invalidString(discordRefreshToken)) {
		ErrorUtil.badRequest("INVALID_DISCORD_REFRESH_TOKEN");
	}
	if (ValidationUtil.invalidNumber(discordTokenExpirationDate)) {
		ErrorUtil.badRequest("INVALID_DISCORD_TOKEN_EXPIRES_IN");
	}
};

export const typeValidation = (createUser: CreateUser) => {
	typeValidationBase(createUser);

	switch (createUser.strategy) {
		case StrategyEnum.DISCORD:
			typeValidationDiscord(createUser);
			break;
		case StrategyEnum.LOCAL:
			// Doesn't need
			break;
		default:
			ErrorUtil.internal("UNHANDLED_STRATEGY");
	}
};
