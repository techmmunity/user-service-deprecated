import { SettingType } from "api/settings/setting.entity";
import { TutorialType } from "api/tutorial/tutorial.entity";
import { UserTokenType } from "api/user-token/user-token.entity";

import { TimeUtil } from "utils/time";

import { LanguageEnum } from "core/enums/language";
import { ThemeEnum } from "core/enums/theme";

import { CreateRelationsParams } from "./types";
import { CreateUser } from "api/user/service/create/types";

const getTutotial = (userId: string): TutorialType => ({
	userId,
	mentoringListPage: true,
	articlesListPage: true,
	coursesListPage: true,
	forumListPage: true,
	jobsListPage: true,
	projectsListPage: true,
	storeListPage: true,
});

const getUserToken = (userId: string, params: CreateUser) => {
	const userToken: UserTokenType = {
		userId,
	};

	switch (params.strategy) {
		case "DISCORD":
			userToken.discord = {
				accessToken: params.discordAccessToken,
				refreshToken: params.discordRefreshToken,
				expirationDate: TimeUtil.newDate(params.discordTokenExpirationDate),
			};
	}

	return userToken;
};

const getSetting = (userId: string, params: CreateUser): SettingType => ({
	userId,
	theme: ThemeEnum.DARK,
	language: params.suggestedLanguage || LanguageEnum.EN,
});

export const createRelations = async ({
	GameficationService,
	SettingRepository,
	TutorialRepository,
	UserTokenRepository,
	userId,
	...params
}: CreateRelationsParams & CreateUser) => {
	const [tutorial, settings, gamefication, verifyAccount] = await Promise.all([
		TutorialRepository.save(getTutotial(userId)),
		SettingRepository.save(getSetting(userId, params)),
		GameficationService.create(userId),
		UserTokenRepository.insert(getUserToken(userId, params)),
	]);

	return {
		tutorial,
		settings,
		gamefication,
		verifyAccount,
	};
};
