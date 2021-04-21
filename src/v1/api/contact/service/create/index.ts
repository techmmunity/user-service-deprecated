import { check } from "@techmmunity/easy-check";
import { v4 } from "uuid";

import { validate } from "./validate";

import { ContactRepository } from "../../contact.entity";

import { DbHandler } from "v1/utils/db-handler";

import { ContactTypeEnum } from "core/enums/contact-type";
import { DbErrorEnum } from "core/enums/db-error";

interface Injectables {
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
	{ ContactRepository }: Injectables,
	params: CreateParams,
) => {
	await validate(params);

	const { userId, contacts } = params;

	return ContactRepository.save(
		contacts.map(({ type, value }) => ({
			userId,
			type,
			value,
			id: v4(),
			primary: false,
		})),
	).catch(
		DbHandler([
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
};
