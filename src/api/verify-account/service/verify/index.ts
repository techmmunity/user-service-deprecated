import { UserService } from "api/user/user.service";

import { validate } from "./validation";

import { VerifyAccountRepository } from "api/verify-account/verify-account.entity";

import { ErrorUtil } from "utils/error";
import { TimeUtil } from "utils/time";

interface Injectables {
	VerifyAccountRepository: VerifyAccountRepository;
	UserService: UserService;
}

export interface VerifyAccountParams {
	confirmationCode: string;
}

export const verify = async ({
	UserService,
	VerifyAccountRepository,
	confirmationCode,
}: VerifyAccountParams & Injectables) => {
	await validate({ confirmationCode });

	const verifyAccount = await VerifyAccountRepository.findOne({
		where: {
			confirmationCode,
		},
	});

	if (!verifyAccount) {
		return ErrorUtil.notFound("CONFIRMATION_CODE_NOT_FOUND");
	}

	await Promise.all([
		UserService.verify({
			userId: verifyAccount.id,
		}),
		VerifyAccountRepository.update(verifyAccount, {
			verifiedAt: TimeUtil.newDate(),
		}),
	]);

	return {
		ok: true,
	};
};
