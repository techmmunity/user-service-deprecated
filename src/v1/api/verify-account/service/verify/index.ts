import { validate } from "./validation";

import { VerifyAccountRepository } from "v1/api/verify-account/verify-account.entity";

import { ErrorUtil } from "v1/utils/error";
import { TimeUtil } from "v1/utils/time";

interface Injectables {
	VerifyAccountRepository: VerifyAccountRepository;
}

export interface VerifyAccountParams {
	userId: string;
	verificationCode: string;
}

export const verify = async (
	{ VerifyAccountRepository }: Injectables,
	params: VerifyAccountParams,
) => {
	await validate(params);

	const { userId, verificationCode } = params;

	const verifyAccount = await VerifyAccountRepository.findOne({
		where: {
			userId,
			verificationCode,
		},
	});

	if (!verifyAccount) {
		return ErrorUtil.notFound(["Confirmation code not found"]);
	}

	verifyAccount.verifiedAt = TimeUtil.newDate();

	await verifyAccount.save();
};
