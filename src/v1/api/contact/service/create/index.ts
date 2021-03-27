import { v4 } from "uuid";

import { validate } from "./validate";

import { ContactRepository } from "../../contact.entity";

import { ContactTypeEnum } from "core/enums/contact-type";

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
	);
};
