import { uuid } from "uuidv4";

import { businessValidation } from "./validation/business-validation";
import { typeValidation } from "./validation/type-validation";

import { VerifyAccountRepository } from "api/verify-account/verify-account.entity";

interface CreateConfirmationCodeParams {
	VerifyAccountRepository: VerifyAccountRepository;
	userId: string;
}

export const createConfirmationCode = async ({
	VerifyAccountRepository,
	userId,
}: CreateConfirmationCodeParams) => {
	typeValidation(userId);

	businessValidation(userId);

	const confirmationCode = uuid();

	await VerifyAccountRepository.insert({
		userId,
		confirmationCode,
	});

	return confirmationCode;
};
