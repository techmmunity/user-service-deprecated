import { HttpCodeEnum, PgErrorEnum } from "@techmmunity/database-error-handler";
import { isEmail, isBrazillianPhone } from "@techmmunity/easy-check";
import { v4 } from "uuid";

import { validate } from "./validate";

import { ContactRepository } from "../../contact.entity";
import { ConfirmationTokenRepository } from "v1/api/confirmation-token/confirmation-token.entity";

import { DbHandler } from "v1/utils/db-handler";
import { PinUtil } from "v1/utils/pin";

import { ConfirmationTokenTypeEnum } from "core/enums/confirmation-token-type";
import { ContactTypeEnum } from "core/enums/contact-type";

interface Injectables {
	ConfirmationTokenRepository: ConfirmationTokenRepository;
	ContactRepository: ContactRepository;
}

export interface CreateParams {
	userId: string;
	contacts: Array<{
		type: ContactTypeEnum;
		value: string;
	}>;
}

export const create = async (
	{ ConfirmationTokenRepository, ContactRepository }: Injectables,
	params: CreateParams,
) => {
	await validate(params);

	const { userId, contacts: contactsToCreate } = params;

	const contacts = await ContactRepository.save(
		contactsToCreate.map(({ type, value }) => ({
			id: v4(),
			userId,
			type,
			value,
		})),
	).catch(
		DbHandler([
			{
				table: "contacts",
				columns: ["user_id"],
				error: PgErrorEnum.ForeignKeyViolation,
				responseCode: HttpCodeEnum.Conflict,
				makeError: ({ user_id }) => ({
					errors: [`User with id "${user_id}" not found`],
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

	const confirmationTokens = await ConfirmationTokenRepository.save(
		contacts.map(({ id: contactId }) => ({
			id: v4(),
			contactId,
			token: PinUtil.gen(6),
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
