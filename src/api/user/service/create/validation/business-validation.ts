import { check } from "@techmmunity/easy-check";

import { ErrorUtil } from "utils/error";
import { TimeUtil } from "utils/time";

import { HeadlineEnum } from "core/enums/heandline";
import { LanguageEnum } from "core/enums/language";
import { StrategyEnum } from "core/enums/strategy";

import {
	BaseCreateUser,
	CreateUser,
	CreateUserByDiscord,
	CreateUserByLocal,
} from "api/user/service/create/types";

const businessValidationBase = ({
	email,
	username,
	birthday,
	avatar,
	suggestedLanguage,
	headline,
}: BaseCreateUser) => {
	if (!check.isEmail(email)) {
		ErrorUtil.badRequest("INVALID_EMAIL");
	}
	if (!check.isSimpleUsername(username)) {
		ErrorUtil.badRequest("INVALID_USERNAME");
	}
	if (birthday && !check.isDateYMD(birthday)) {
		ErrorUtil.badRequest("INVALID_BIRTHDAY");
	}
	if (avatar && !check.isUrl(avatar)) {
		ErrorUtil.badRequest("INVALID_AVATAR");
	}
	if (suggestedLanguage && !LanguageEnum[suggestedLanguage]) {
		ErrorUtil.badRequest("INVALID_LANGUAGE");
	}
	if (headline && !HeadlineEnum[headline]) {
		ErrorUtil.badRequest("INVALID_HEADLINE");
	}
};

const nameHasCorrectLength = (name: string) => name.split(" ").length >= 2;

const businessValidationDiscord = ({
	fullName,
	discordTokenExpirationDate,
}: CreateUserByDiscord) => {
	if (!nameHasCorrectLength(fullName)) {
		ErrorUtil.badRequest("INVALID_FULL_NAME");
	}

	const now = TimeUtil.newDate().getTime();

	if (discordTokenExpirationDate < now) {
		ErrorUtil.badRequest("INVALID_DISCORD_TOKEN_EXPIRES_IN");
	}
};

const businessValidationLocal = ({ password }: CreateUserByLocal) => {
	if (!check.isStrongPassword(password)) {
		ErrorUtil.badRequest("INVALID_PASSWORD");
	}
};

export const businessValidation = (createUser: CreateUser) => {
	businessValidationBase(createUser);

	switch (createUser.strategy) {
		case StrategyEnum.DISCORD:
			businessValidationDiscord(createUser);
			break;
		case StrategyEnum.LOCAL:
			businessValidationLocal(createUser);
			break;
		default:
			ErrorUtil.internal("UNHANDLED_STRATEGY_BUSINESS");
	}
};
