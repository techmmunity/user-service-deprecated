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
}
