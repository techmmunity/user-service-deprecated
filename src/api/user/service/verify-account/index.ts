import { check } from "@techmmunity/easy-check";
import { ObjectID } from "typeorm";

import { UserRepository } from "api/user/entities/user.entity";
import { VerifyAccountRepository } from "api/user/entities/verify-account.entity";

import { ErrorUtil } from "utils/error";

interface verifyAccountParams {
	UserRepository: UserRepository;
	VerifyAccountRepository: VerifyAccountRepository;
	confirmationCode: string;
}

export const verifyAccount = async ({
	UserRepository,
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
		ErrorUtil.notFound("INVALID_CONFIRMATION_CODE");
	}

	await UserRepository.update(
		{
			_id: new ObjectID(verifyAccount.userId),
		},
		{
			verified: true,
		},
	);

	return {
		ok: true,
	};
};
