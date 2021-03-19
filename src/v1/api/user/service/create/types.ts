import { SettingsService } from "v1/api/settings/settings.service";
import { TutorialService } from "v1/api/tutorial/tutorial.service";
import { UserTokenService } from "v1/api/user-token/user-token.service";
import { VerifyAccountService } from "v1/api/verify-account/verify-account.service";

import { UserRepository } from "v1/api/user/user.entity";

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
	VerifyAccountService: VerifyAccountService;
}
