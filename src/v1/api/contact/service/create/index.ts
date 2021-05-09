import { check } from "@techmmunity/easy-check";
import { v4 } from "uuid";

import { validate } from "./validate";

import { ContactRepository } from "../../contact.entity";
import { ConfirmationTokenRepository } from "v1/api/confirmation-token/confirmation-token.entity";

import { DbHandler } from "v1/utils/db-handler";
import { PinUtil } from "v1/utils/pin";

import { ConfirmationTokenTypeEnum } from "core/enums/confirmation-token-type";
import { ContactTypeEnum } from "core/enums/contact-type";
import { DbErrorEnum } from "core/enums/db-error";

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
			userId,
			type,
			value,
			id: v4(),
		})),
	).catch(
		DbHandler([
			{
				error: DbErrorEnum.ForeignKeyViolation,
				table: "contacts",
				handleWith: "conflict",
				message: () => `User with id "${userId}" not found`,
			},
			{
				error: DbErrorEnum.UniqueViolation,
				table: "contacts",
				column: "value",
				handleWith: "conflict",
				validate: check.isEmail,
				message: email => `Email "${email}" is already linked to an user`,
			},
			{
				error: DbErrorEnum.UniqueViolation,
				table: "contacts",
				column: "value",
				handleWith: "conflict",
				validate: check.isBrazillianPhone,
				message: phone => `Phone "${phone}" is already linked to an user`,
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
