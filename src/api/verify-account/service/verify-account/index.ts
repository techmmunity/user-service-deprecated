import { check } from "@techmmunity/easy-check";

import { VerifyAccountRepository } from "api/verify-account/verify-account.entity";

import { ErrorUtil } from "utils/error";
import { TimeUtil } from "utils/time";

interface verifyAccountParams {
	VerifyAccountRepository: VerifyAccountRepository;
	confirmationCode: string;
}

export const verifyAccount = async ({
	VerifyAccountRepository,
	confirmationCode,
}: verifyAccountParams) => {
	if (!check.isUUIDv4(confirmationCode)) {
		ErrorUtil.badRequest("INVALID_CONFIRMATION_CODE");
	}

	const verifyAccount = await VerifyAccountRepository.findOne({
		where: {
			confirmationCode,
		},
	});

	if (!verifyAccount) {
		return ErrorUtil.notFound("CONFIRMATION_CODE_NOT_FOUND");
	}

	await VerifyAccountRepository.update(verifyAccount, {
		verifiedAt: TimeUtil.newDate(),
	});

	return {
		ok: true,
	};
};
