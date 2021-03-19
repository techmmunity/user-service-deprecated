import { v4 } from "uuid";

import { validate } from "./validation";

import { VerifyAccountRepository } from "v1/api/verify-account/verify-account.entity";

interface Injectables {
	VerifyAccountRepository: VerifyAccountRepository;
}

export interface CreateVerificationCodeParams {
	userId: string;
}

export const create = async ({
	VerifyAccountRepository,
	userId,
}: CreateVerificationCodeParams & Injectables) => {
	await validate({ userId });

	const verificationCode = v4();

	await VerifyAccountRepository.insert({
		id: userId,
		verificationCode,
	});

	return verificationCode;
};
