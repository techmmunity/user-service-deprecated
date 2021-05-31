import { HttpCodeEnum, PgErrorEnum } from "@techmmunity/database-error-handler";
import { isEmail, isBrazillianPhone } from "@techmmunity/easy-check";
import { v4 } from "uuid";

import { validate } from "./validate";

import { ContactRepository } from "../../contact.entity";
import { ConfirmationTokenRepository } from "v1/api/confirmation-token/confirmation-token.entity";

import { dbHandler } from "v1/utils/db-handler";
import { pinUtil } from "v1/utils/pin";

import { ConfirmationTokenTypeEnum } from "core/enums/confirmation-token-type";
import { ContactTypeEnum } from "core/enums/contact-type";

interface Injectables {
	confirmationTokenRepository: ConfirmationTokenRepository;
	contactRepository: ContactRepository;
}

export interface CreateParams {
	userId: string;
	contacts: Array<{
		type: ContactTypeEnum;
		value: string;
	}>;
}

export const create = async (
	{ confirmationTokenRepository, contactRepository }: Injectables,
	params: CreateParams,
) => {
	await validate(params);

	const { userId, contacts: contactsToCreate } = params;

	const contacts = await contactRepository
		.save(
			contactsToCreate.map(({ type, value }) => ({
				id: v4(),
				userId,
				type,
				value,
			})),
		)
		.catch(
			dbHandler([
				{
					table: "contacts",
					columns: ["user_id"],
					error: PgErrorEnum.ForeignKeyViolation,
					responseCode: HttpCodeEnum.Conflict,
					makeError: ({ user_id: existantUserId }) => ({
						errors: [`User with id "${existantUserId}" not found`],
					}),
				},
				{
					table: "contacts",
					columns: ["value"],
					error: PgErrorEnum.UniqueViolation,
					responseCode: HttpCodeEnum.Conflict,
					validate: ({ value }) => isEmail(value),
					makeError: ({ value }) => ({
						errors: [`Email "${value}" is already linked to an user`],
					}),
				},
				{
					table: "contacts",
					columns: ["value"],
					error: PgErrorEnum.UniqueViolation,
					responseCode: HttpCodeEnum.Conflict,
					validate: ({ value }) => isBrazillianPhone(value),
					makeError: ({ value }) => ({
						errors: [`Phone "${value}" is already linked to an user`],
					}),
				},
			]),
		);

	const confirmationTokens = await confirmationTokenRepository.save(
		contacts.map(({ id: contactId }) => ({
			id: v4(),
			contactId,
			token: pinUtil.gen(6),
			type: ConfirmationTokenTypeEnum.VERIFY_CONTACT,
		})),
	);

	return contacts.map(contact => ({
		...contact,
		confirmationTokens: [
			confirmationTokens.find(
				confirmationToken => confirmationToken.contactId === contact.id,
			),
		],
	}));
};
