import { validate } from "./validate";

import { UserRepository } from "v1/api/user/user.entity";

import { ErrorUtil } from "v1/utils/error";
import { PinUtil } from "v1/utils/pin";

interface Injectables {
	UserRepository: UserRepository;
}

export interface VerifyParams {
	userId: string;
	verificationCode: string;
}

export const verify = async (
	{ UserRepository }: Injectables,
	params: VerifyParams,
) => {
	await validate(params);

	const { userId, verificationCode } = params;

	const newPin = PinUtil.gen();

	const result = await UserRepository.update(
		{
			id: userId,
			pin: verificationCode,
		},
		{
			pin: newPin,
			verifiedAt: new Date(),
		},
	);

	if (result.affected !== 1) {
		return ErrorUtil.badRequest(["Invalid userId or verificationCode"]);
	}
};
