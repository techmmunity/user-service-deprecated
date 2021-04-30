import { check } from "@techmmunity/easy-check";
import { v4 } from "uuid";

import { validate } from "./validate";

import { ConfirmationTokenRepository } from "v1/api/confirmation-token/confirmation-token.entity";
import { ContactRepository } from "v1/api/contact/contact.entity";
import { UserType, UserRepository } from "v1/api/user/user.entity";

import { DbHandler } from "v1/utils/db-handler";
import { PasswordUtil } from "v1/utils/password";
import { PinUtil } from "v1/utils/pin";

import { ConfirmationTokenTypeEnum } from "core/enums/confirmation-token-type";
import { ContactTypeEnum } from "core/enums/contact-type";
import { DbErrorEnum } from "core/enums/db-error";

export interface CreateLocalParams {
	email: string;
	username: string;
	password: string;
}

export interface Injectables {
	UserRepository: UserRepository;
	ContactRepository: ContactRepository;
	ConfirmationTokenRepository: ConfirmationTokenRepository;
}

export const formatData = ({
	username,
	password,
}: CreateLocalParams): UserType => ({
	id: v4(),
	password: PasswordUtil.encrypt(password),
	pin: PinUtil.gen(),
	username,
});

export const createLocal = async (
	{
		UserRepository,
		ContactRepository,
		ConfirmationTokenRepository,
	}: Injectables,
	params: CreateLocalParams,
) => {
	await validate(params);

	const userData = formatData(params);

	const user = await UserRepository.save(userData).catch(
		DbHandler([
			{
				error: DbErrorEnum.UniqueViolation,
				table: "users",
				column: "username",
				handleWith: "conflict",
				message: username => `User with username "${username}" already exists`,
			},
		]),
	);

	const contact = await ContactRepository.save({
		id: v4(),
		userId: userData.id,
		type: ContactTypeEnum.EMAIL,
		value: params.email,
		primary: true,
	}).catch(
		DbHandler([
			{
				error: DbErrorEnum.UniqueViolation,
				table: "contacts",
				column: "value",
				handleWith: "conflict",
				validate: check.isEmail,
				message: email => `Email "${email}" is already linked to an user`,
			},
		]),
	);

	const confirmationToken = await ConfirmationTokenRepository.save({
		id: v4(),
		type: ConfirmationTokenTypeEnum.VERIFY_CONTACT,
		token: PinUtil.gen(6),
		contactId: contact.id,
	});

	return {
		userId: user.id,
		contactId: contact.id,
		username: user.username,
		email: contact.value,
		verificationCode: confirmationToken.token,
	};
};
