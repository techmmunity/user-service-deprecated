import { uuid } from "uuidv4";

import { businessValidation } from "./validation/business-validation";
import { typeValidation } from "./validation/type-validation";

import { VerifyAccountRepository } from "api/verify-account/verify-account.entity";

interface CreateVerificationCodeParams {
	VerifyAccountRepository: VerifyAccountRepository;
	userId: string;
}

export const create = async ({
	VerifyAccountRepository,
	userId,
}: CreateVerificationCodeParams) => {
	typeValidation(userId);

	businessValidation(userId);

	const verificationCode = uuid();

	await VerifyAccountRepository.insert({
		id: userId,
		verificationCode,
	});

	return verificationCode;
};
