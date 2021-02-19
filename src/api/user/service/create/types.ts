import { SettingsService } from "api/settings/settings.service";
import { TutorialService } from "api/tutorial/tutorial.service";
import { UserTokenService } from "api/user-token/user-token.service";

import { UserRepository } from "api/user/user.entity";

import { HeadlineEnum } from "core/enums/headline";
import { LanguageEnum } from "core/enums/language";

export interface BaseCreateUser {
	email: string;
	username: string;
	fullName: string;
	password: string;
	birthday: Date;
	headline: HeadlineEnum;
	suggestedLanguage?: LanguageEnum;
	avatar?: string;
}

export interface BaseInjectables {
	UserRepository: UserRepository;
	SettingsService: SettingsService;
	TutorialService: TutorialService;
	UserTokenService: UserTokenService;
}
