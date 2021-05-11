import { getConfirmationToken } from "./helpers/get-confirmation-token";

import { validate } from "./validate";

import { UserRepository } from "../../user.entity";
import { ConfirmationTokenRepository } from "v1/api/confirmation-token/confirmation-token.entity";

import { ErrorUtil } from "v1/utils/error";
import { PinUtil } from "v1/utils/pin";

interface Injectables {
	ConfirmationTokenRepository: ConfirmationTokenRepository;
	UserRepository: UserRepository;
}

export interface ChangePasswordParams {
	confirmationTokenId: string;
	newPassword: string;
}

export const changePassword = async (
	{ ConfirmationTokenRepository, UserRepository }: Injectables,
	params: ChangePasswordParams,
) => {
	await validate(params);

	const { confirmationTokenId, newPassword } = params;

	const confirmationToken = await getConfirmationToken({
		ConfirmationTokenRepository,
		confirmationTokenId,
	});

	const result = await UserRepository.update(
		confirmationToken.userId as string,
		{
			password: newPassword,
			pin: PinUtil.gen(),
		},
	);

	if (result.affected !== 1) {
		return ErrorUtil.notFound(["User not found"]);
	}
};
