import * as bcrypt from "bcrypt";
import { v4 } from "uuid";

import { generatePIN } from "../../helpers/generate-pin";

import { UserType } from "api/user/user.entity";

import { TimeUtil } from "utils/time";

import { LanguageEnum } from "core/enums/language";

import { DEFAULT_USER_PERMISSIONS } from "config/default-user-permissions";

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
	verified,
	suggestedLanguage,
}: BaseCreateUser) => {
	const { name, surnames } = getNameAndSurnames(fullName);

	const id = v4();

	const user: UserType = {
		id,
		name,
		surnames,
		email,
		username,
		headline,
		verified: verified ? true : false,
		birthday: TimeUtil.unformat(birthday),
		password: getPasswordEncrypted(password),
		languages: getLanguages(suggestedLanguage),
		pin: generatePIN(),
		permissions: DEFAULT_USER_PERMISSIONS,
		interests: [],
	};

	if (avatar) {
		user.avatar = avatar;
	}

	return user as UserType;
};
