import { HttpCodeEnum, PgErrorEnum } from "@techmmunity/database-error-handler";
import { isEmail } from "@techmmunity/easy-check";
import { v4 } from "uuid";

import { validate } from "./validate";

import { ConfirmationTokenRepository } from "v1/api/confirmation-token/confirmation-token.entity";
import { UserType, UserRepository } from "v1/api/user/user.entity";

import { dbHandler } from "v1/utils/db-handler";
import { passwordUtil } from "v1/utils/password";
import { pinUtil } from "v1/utils/pin";

import { ConfirmationTokenTypeEnum } from "core/enums/confirmation-token-type";
import { ContactTypeEnum } from "core/enums/contact-type";

export interface CreateLocalParams {
	email: string;
	username: string;
	password: string;
}

export interface Injectables {
	userRepository: UserRepository;
	confirmationTokenRepository: ConfirmationTokenRepository;
}

export const formatData = ({
	username,
	password,
}: CreateLocalParams): UserType => ({
	id: v4(),
	password: passwordUtil.encrypt(password),
	pin: pinUtil.gen(),
	username,
});

export const createLocal = async (
	{ userRepository, confirmationTokenRepository }: Injectables,
	params: CreateLocalParams,
) => {
	await validate(params);

	const userData = formatData(params);

	const user = await userRepository
		.save({
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
		})
		.catch(
			dbHandler([
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

	const confirmationToken = await confirmationTokenRepository.save({
		id: v4(),
		type: ConfirmationTokenTypeEnum.VERIFY_CONTACT,
		token: pinUtil.gen(6),
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
