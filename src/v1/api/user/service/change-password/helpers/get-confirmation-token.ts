import { validateExpired } from "v1/api/confirmation-token/helpers/validate-expired";
import { validateUsed } from "v1/api/confirmation-token/helpers/validate-used";

import { ConfirmationTokenRepository } from "v1/api/confirmation-token/confirmation-token.entity";

import { errorUtil } from "v1/utils/error";

import { ConfirmationTokenTypeEnum } from "core/enums/confirmation-token-type";

interface GetConfirmationTokenParams {
	confirmationTokenRepository: ConfirmationTokenRepository;
	confirmationTokenId: string;
}

export const getConfirmationToken = async ({
	confirmationTokenRepository,
	confirmationTokenId,
}: GetConfirmationTokenParams) => {
	const confirmationToken = await confirmationTokenRepository.findOne(
		confirmationTokenId,
	);

	if (!confirmationToken) {
		return errorUtil.notFound(["Confirmation token not found"]);
	}

	if (confirmationToken.type !== ConfirmationTokenTypeEnum.CHANGE_PASSWORD) {
		return errorUtil.badRequest(["Invalid confirmation token"]);
	}

	if (!confirmationToken.userId) {
		return errorUtil.badRequest(["Invalid confirmation token"]);
	}

	validateUsed(confirmationToken);

	validateExpired(confirmationToken);

	return confirmationToken;
};
