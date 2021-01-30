import { TimeUtil } from "utils/time";

import { LanguageEnum } from "core/enums/language";

import { ROLES_IDS } from "config/discord";

interface GetRolesParams {
	guildId: string;
	birthday: Date;
	language?: LanguageEnum;
}

const getAgeRole = (birthday: Date) => {
	const age = TimeUtil.getAge(birthday);

	switch (true) {
		case age >= 40:
			return "+40";
		case age >= 30 && age <= 39:
			return "20~29";
		case age >= 20 && age <= 29:
			return "20~29";
		case age <= 19:
		default:
			return "-19";
	}
};

export const getRoles = ({ guildId, birthday, language }: GetRolesParams) => {
	const ageRole = getAgeRole(birthday);

	return [
		ROLES_IDS[guildId].SENIORITY,
		ROLES_IDS[guildId].INTERESTS,
		ROLES_IDS[guildId].LANGUAGES,
		ROLES_IDS[guildId].ETC,
		ROLES_IDS[guildId].MEMBER,
		ROLES_IDS[guildId][ageRole],
		ROLES_IDS[guildId][language],
	].filter(Boolean);
};
