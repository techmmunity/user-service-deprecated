import { HttpCodeEnum, PgErrorEnum } from "@techmmunity/database-error-handler";
import { isEmail } from "@techmmunity/easy-check";
import { v4 } from "uuid";

import { validate } from "./validate";

import { ConfirmationTokenRepository } from "v1/api/confirmation-token/confirmation-token.entity";
import { UserType, UserRepository } from "v1/api/user/user.entity";

import { DbHandler } from "v1/utils/db-handler";
import { PasswordUtil } from "v1/utils/password";
import { PinUtil } from "v1/utils/pin";

import { ConfirmationTokenTypeEnum } from "core/enums/confirmation-token-type";
import { ContactTypeEnum } from "core/enums/contact-type";

export interface CreateLocalParams {
	email: string;
	username: string;
	password: string;
}

export interface Injectables {
	UserRepository: UserRepository;
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
	{ UserRepository, ConfirmationTokenRepository }: Injectables,
	params: CreateLocalParams,
) => {
	await validate(params);

	const userData = formatData(params);

	const user = await UserRepository.save({
		...userData,
		contacts: [
			{
				id: v4(),
				userId: userData.id,
				type: ContactTypeEnum.EMAIL,
				value: params.email,
				primary: true,
			},
		],
	}).catch(
		DbHandler([
			{
				error: PgErrorEnum.UniqueViolation,
				table: "users",
				columns: ["username"],
				responseCode: HttpCodeEnum.Conflict,
				makeError: ({ username }) => ({
					errors: [`User with username "${username}" already exists`],
				}),
			},
			{
				error: PgErrorEnum.UniqueViolation,
				table: "contacts",
				columns: ["value"],
				responseCode: HttpCodeEnum.Conflict,
				validate: ({ value }) => isEmail(value),
				makeError: ({ value }) => ({
					errors: [`Email "${value}" is already linked to an user`],
				}),
			},
		]),
	);

	const contact = user.contacts.shift();

	const confirmationToken = await ConfirmationTokenRepository.save({
		id: v4(),
		type: ConfirmationTokenTypeEnum.VERIFY_CONTACT,
		token: PinUtil.gen(6),
		contactId: contact.id,
	});

	return {
		username: user.username,
		email: contact.value,
		userId: user.id,
		contactId: contact.id,
		verificationCode: confirmationToken.token,
	};
};
