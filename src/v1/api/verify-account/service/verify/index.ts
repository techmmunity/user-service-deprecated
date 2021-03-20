import { UserService } from "v1/api/user/user.service";

import { validate } from "./validation";

import { VerifyAccountRepository } from "v1/api/verify-account/verify-account.entity";

import { ErrorUtil } from "v1/utils/error";
import { TimeUtil } from "v1/utils/time";

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
};
