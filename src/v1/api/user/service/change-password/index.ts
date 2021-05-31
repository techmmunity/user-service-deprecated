import { getConfirmationToken } from "./helpers/get-confirmation-token";

import { validate } from "./validate";

import { UserRepository } from "../../user.entity";
import { ConfirmationTokenRepository } from "v1/api/confirmation-token/confirmation-token.entity";

import { errorUtil } from "v1/utils/error";
import { pinUtil } from "v1/utils/pin";

interface Injectables {
	confirmationTokenRepository: ConfirmationTokenRepository;
	userRepository: UserRepository;
}

export interface ChangePasswordParams {
	confirmationTokenId: string;
	newPassword: string;
}

export const changePassword = async (
	{ confirmationTokenRepository, userRepository }: Injectables,
	params: ChangePasswordParams,
) => {
	await validate(params);

	const { confirmationTokenId, newPassword } = params;

	const confirmationToken = await getConfirmationToken({
		confirmationTokenRepository,
		confirmationTokenId,
	});

	const result = await userRepository.update(
		confirmationToken.userId as string,
		{
			password: newPassword,
			pin: pinUtil.gen(),
		},
	);

	if (result.affected !== 1) {
		return errorUtil.notFound(["User not found"]);
	}

	return {
		userId: confirmationToken.userId,
	};
};
