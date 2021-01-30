import { HeadlineEnum } from "core/enums/heandline";
import { LanguageEnum } from "core/enums/language";

enum DiscordRolesEnum {
	MEMBER = "796424366459060225",
	// SENIORITY
	JUNIOR = "784056650519674880",
	MIDDLE = "784056413559062588",
	SENIOR = "784056358344851468",
	// DESIGN, RECRUITER, ETC
	DEV = "796446192875733012",
	DESIGN = "788466930742067250",
	RECRUITER = "786567688112701490",
	// AGE RANGE
	_19 = "787137471565529118",
	_20_29 = "787137510572425216",
	_30_39 = "787137518247346196",
	_40 = "787137521757716550",
	// LANGUAGES
	PORTUGUESE = "784057766741803010",
	ENGLISH = "784058205482254336",
	SPANISH = "785272949857845288",
	FRENCH = "785273550634352680",
	ITALIAN = "785273157128683581",
	// CATEGORIES
	SENIORITY = "785264717350174760",
	HEADLINE = "786567918732967947",
	INTERESTS = "785270939659010098",
	LANGUAGES = "785264929560985610",
	ETC = "785265100003999785",
}

interface Params {
	headline: HeadlineEnum;
	language: LanguageEnum;
}

const getDefaultRoles = () => [
	DiscordRolesEnum.MEMBER,
	DiscordRolesEnum.HEADLINE,
	DiscordRolesEnum.INTERESTS,
	DiscordRolesEnum.LANGUAGES,
	DiscordRolesEnum.ETC,
];

const getHeadlineRoles = (headline: HeadlineEnum) => {
	switch (headline) {
		case HeadlineEnum.BACK_END_DEV:
		case HeadlineEnum.FRONT_END_DEV:
		case HeadlineEnum.FULL_STACK_DEV:
		case HeadlineEnum.GAME_DEV:
		case HeadlineEnum.TECH_LEADER:
		case HeadlineEnum.TECH_MANAGER:
			return [
				DiscordRolesEnum.DEV,
				DiscordRolesEnum.SENIORITY,
				DiscordRolesEnum.JUNIOR,
			];
		case HeadlineEnum.DESIGNER:
		case HeadlineEnum.ANIMATOR:
		case HeadlineEnum.GAME_DESIGNER:
			return [DiscordRolesEnum.DESIGN];
		case HeadlineEnum.RECRUITER:
			return [DiscordRolesEnum.RECRUITER];
		default:
			return [];
	}
};

const getLanguageRole = (language: LanguageEnum) => {
	switch (language) {
		case LanguageEnum.PT_BR:
			return DiscordRolesEnum.PORTUGUESE;
		case LanguageEnum.EN:
		default:
			return DiscordRolesEnum.ENGLISH;
	}
};

export const getRoles = ({ headline, language }: Params) => [
	...getDefaultRoles(),
	...getHeadlineRoles(headline),
	getLanguageRole(language),
];
