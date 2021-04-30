import { check } from "@techmmunity/easy-check";
import { v4 } from "uuid";

import { validate } from "./validate";

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
	{ UserRepository }: Injectables,
	params: CreateLocalParams,
) => {
	await validate(params);

	const userData = formatData(params);

	const contactId = v4();

	return UserRepository.save({
		...userData,
		contacts: [
			{
				id: contactId,
				userId: userData.id,
				type: ContactTypeEnum.EMAIL,
				value: params.email,
				primary: true,
				confirmationTokens: [
					{
						id: v4(),
						type: ConfirmationTokenTypeEnum.VERIFY_CONTACT,
						token: PinUtil.gen(6),
						contactId,
					},
				],
			},
		],
	})
		.then(user => ({
			userId: user.id,
			contactId: user.contacts[0].id,
			username: user.username,
			email: user.contacts[0].value,
			verificationCode: user.contacts[0].confirmationTokens[0].token,
		}))
		.catch(
			DbHandler([
				{
					error: DbErrorEnum.UniqueViolation,
					table: "users",
					column: "username",
					handleWith: "conflict",
					message: username =>
						`User with username "${username}" already exists`,
				},
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
};
