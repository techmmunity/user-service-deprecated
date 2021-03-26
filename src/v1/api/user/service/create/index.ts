import { formatData } from "./helpers/format-data";

import { validate } from "./validation";

import { UserRepository } from "v1/api/user/user.entity";

import { HeadlineEnum } from "core/enums/headline";
import { LanguageEnum } from "core/enums/language";

export interface CreateParams {
	email: string;
	username: string;
	fullName: string;
	password: string;
	birthday: Date;
	headline: HeadlineEnum;
	suggestedLanguage?: LanguageEnum;
	avatar?: string;
}

export interface Injectables {
	UserRepository: UserRepository;
}

export const create = async (
	{ UserRepository }: Injectables,
	params: CreateParams,
) => {
	await validate(params);

	const userData = formatData(params);

	return UserRepository.save(userData);
};
