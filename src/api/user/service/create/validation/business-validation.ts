import { check } from "@techmmunity/easy-check";

import { ErrorUtil } from "utils/error";

import { HeadlineEnum } from "core/enums/headline";
import { LanguageEnum } from "core/enums/language";

import { BaseCreateUser } from "../types";

export const businessValidation = ({
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
