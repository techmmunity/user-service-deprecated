import { v4 } from "uuid";

import { validate } from "./validation";

import { VerifyAccountRepository } from "v1/api/verify-account/verify-account.entity";

import { PinUtil } from "v1/utils/pin";

import { Limits } from "v1/config/limits";

interface Injectables {
	VerifyAccountRepository: VerifyAccountRepository;
}

export interface CreateVerifyAccountParams {
	userId: string;
}

export const create = async (
	{ VerifyAccountRepository }: Injectables,
	params: CreateVerifyAccountParams,
) => {
	await validate(params);

	const { userId } = params;

	const verificationCode = PinUtil.gen(Limits.verifyAccount.code.max);

	await VerifyAccountRepository.save({
		id: v4(),
		userId,
		verificationCode,
	});

	return verificationCode;
};
