import { ValidationUtil } from "utils/validation";

import { ErrorUtil } from "utils/error";

import { BaseCreateUser } from "../types";

export const typeValidation = (params: BaseCreateUser) => {
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
