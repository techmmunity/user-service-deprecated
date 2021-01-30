import { HeadlineEnum } from "core/enums/headline";
import { LanguageEnum } from "core/enums/language";
import { StrategyEnum } from "core/enums/strategy";

export interface BaseCreateUser {
	strategy: StrategyEnum;
	email: string;
	username: string;
	fullName: string;
	birthday: string;
	password: string;
	suggestedLanguage?: LanguageEnum;
	headline?: HeadlineEnum;
	avatar?: string;
}

export interface CreateUserByDiscord extends BaseCreateUser {
	strategy: StrategyEnum.DISCORD;
	discordUserId: string;
	discordAccessToken: string;
	discordRefreshToken: string;
	discordTokenExpirationDate: number;
}

export interface CreateUserByLocal extends BaseCreateUser {
	strategy: StrategyEnum.LOCAL;
}

export type CreateUser = CreateUserByDiscord | CreateUserByLocal;
