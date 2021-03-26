import * as bcrypt from "bcrypt";
import { v4 } from "uuid";

import { validate } from "./validate";

import { ContactService } from "v1/api/contact/contact.service";

import { UserType, UserRepository } from "v1/api/user/user.entity";

import { PinUtil } from "v1/utils/pin";

import { ContactTypeEnum } from "core/enums/contact-type";
import { HeadlineEnum } from "core/enums/headline";
import { LanguageEnum } from "core/enums/language";

export interface CreateParams {
	email: string;
	username: string;
	password: string;
	headline: HeadlineEnum;
	suggestedLanguage: LanguageEnum;
}

export interface Injectables {
	ContactService: ContactService;
	UserRepository: UserRepository;
}

const getPasswordEncrypted = (password: string) =>
	bcrypt.hashSync(password, 10);

export const formatData = ({
	username,
	headline,
	password,
}: CreateParams): UserType => ({
	id: v4(),
	password: getPasswordEncrypted(password),
	pin: PinUtil.gen(),
	username,
	headline,
});

export const create = async (
	{ UserRepository, ContactService }: Injectables,
	params: CreateParams,
) => {
	await validate(params);

	const userData = formatData(params);

	const [user] = await Promise.all([
		UserRepository.save(userData),
		ContactService.create({
			userId: userData.id,
			contacts: [
				{
					type: ContactTypeEnum.EMAIL,
					value: params.email,
					primary: true,
				},
			],
		}),
	]);

	return {
		userId: user.id,
		verificationCode: user.pin,
	};
};
