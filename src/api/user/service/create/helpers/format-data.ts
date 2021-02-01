import * as bcrypt from "bcrypt";

import { UserType } from "api/user/user.entity";

import { TimeUtil } from "utils/time";

import { LanguageEnum } from "core/enums/language";
import { PermissionsEnum } from "core/enums/permissions";

import { BaseCreateUser } from "../types";

const getNameAndSurnames = (fullName: string) => {
	const [name, ...surnamesArray] = fullName.split(" ");

	return {
		name,
		surnames: surnamesArray.join(" "),
	};
};

const getPasswordEncrypted = (password: string) =>
	bcrypt.hashSync(password, 10);

const getLanguages = (suggestedLanguage?: LanguageEnum) => {
	if (suggestedLanguage) {
		return [suggestedLanguage];
	}

	return [];
};

export const formatData = ({
	email,
	username,
	avatar,
	headline,
	birthday,
	fullName,
	password,
	suggestedLanguage,
}: BaseCreateUser) => {
	const { name, surnames } = getNameAndSurnames(fullName);

	const user: UserType = {
		name,
		surnames,
		email,
		username,
		verified: false,
		birthday: TimeUtil.unformat(birthday),
		password: getPasswordEncrypted(password),
		languages: getLanguages(suggestedLanguage),
		permissions: [
			PermissionsEnum.ARTICLE_LIKE,
			PermissionsEnum.ARTICLE_COMMENT_CREATE,
			PermissionsEnum.ARTICLE_COMMENT_UPDATE_OWN,
			PermissionsEnum.ARTICLE_COMMENT_DELETE_OWN,
			PermissionsEnum.COURSE_RATE,
			PermissionsEnum.COURSE_COMMENT_CREATE,
			PermissionsEnum.COURSE_COMMENT_UPDATE_OWN,
			PermissionsEnum.COURSE_COMMENT_DELETE_OWN,
			PermissionsEnum.FORUM_QUESTION_LIKE,
			PermissionsEnum.FORUM_QUESTION_CREATE,
			PermissionsEnum.FORUM_QUESTION_UPDATE_OWN,
			PermissionsEnum.FORUM_QUESTION_DELETE_OWN,
			PermissionsEnum.FORUM_ANSWER_LIKE,
			PermissionsEnum.CERTIFICATION_BUY,
			PermissionsEnum.PROJECT_APPLY,
			PermissionsEnum.MENTOR_ADD,
		],
	};

	if (avatar) {
		user.avatar = avatar;
	}
	if (headline) {
		user.headline = headline;
	}

	return user as UserType;
};
