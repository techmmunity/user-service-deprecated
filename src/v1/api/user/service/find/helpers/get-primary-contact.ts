import { ContactRepository } from "v1/api/contact/contact.entity";

import { ErrorUtil } from "v1/utils/error";

interface GetPrimaryContact {
	ContactRepository: ContactRepository;
	userId: string;
}

export const getPrimaryContact = async ({
	ContactRepository,
	userId,
}: GetPrimaryContact) => {
	const primaryContact = await ContactRepository.findOne({
		userId,
		primary: true,
		verified: true,
	});

	if (!primaryContact) {
		return ErrorUtil.notFound(["User not found"]);
	}

	return primaryContact;
};
