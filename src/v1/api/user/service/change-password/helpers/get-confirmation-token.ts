import { validateExpired } from "v1/api/confirmation-token/helpers/validate-expired";
import { validateUsed } from "v1/api/confirmation-token/helpers/validate-used";

import { ConfirmationTokenRepository } from "v1/api/confirmation-token/confirmation-token.entity";

import { ErrorUtil } from "v1/utils/error";

import { ConfirmationTokenTypeEnum } from "core/enums/confirmation-token-type";

interface GetConfirmationTokenParams {
	ConfirmationTokenRepository: ConfirmationTokenRepository;
	confirmationTokenId: string;
}

export const getConfirmationToken = async ({
	ConfirmationTokenRepository,
	confirmationTokenId,
}: GetConfirmationTokenParams) => {
	const confirmationToken = await ConfirmationTokenRepository.findOne(
		confirmationTokenId,
	);

	if (!confirmationToken) {
		return ErrorUtil.notFound(["Confirmation token not found"]);
	}

	if (confirmationToken.type !== ConfirmationTokenTypeEnum.CHANGE_PASSWORD) {
		return ErrorUtil.badRequest(["Invalid confirmation token"]);
	}

	if (!confirmationToken.userId) {
		return ErrorUtil.badRequest(["Invalid confirmation token"]);
	}

	validateUsed(confirmationToken);

	validateExpired(confirmationToken);

	return confirmationToken;
};
