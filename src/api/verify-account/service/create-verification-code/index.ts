import { uuid } from "uuidv4";

import { businessValidation } from "./validation/business-validation";
import { typeValidation } from "./validation/type-validation";

import { VerifyAccountRepository } from "api/verify-account/verify-account.entity";

interface CreateVerificationCodeParams {
	VerifyAccountRepository: VerifyAccountRepository;
	userId: string;
}

export const createVerificationCode = async ({
	VerifyAccountRepository,
	userId,
}: CreateVerificationCodeParams) => {
	typeValidation(userId);

	businessValidation(userId);

	const verificationCode = uuid();

	await VerifyAccountRepository.insert({
		userId,
		verificationCode,
	});

	return verificationCode;
};
