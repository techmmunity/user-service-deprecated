import { ContactRepository } from "v1/api/contact/contact.entity";

import { errorUtil } from "v1/utils/error";

interface GetPrimaryContact {
	contactRepository: ContactRepository;
	userId: string;
}

export const getPrimaryContact = async ({
	contactRepository,
	userId,
}: GetPrimaryContact) => {
	const primaryContact = await contactRepository.findOne({
		userId,
		primary: true,
		verified: true,
	});

	if (!primaryContact) {
		return errorUtil.notFound(["User not found"]);
	}

	return primaryContact;
};
