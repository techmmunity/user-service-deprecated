import { ConfirmationTokenRepository } from "v1/api/confirmation-token/confirmation-token.entity";

import { errorUtil } from "v1/utils/error";

interface GetConfirmationTokenParams {
	confirmationTokenRepository: ConfirmationTokenRepository;
	contactId: string;
	verificationCode: string;
}

export const getConfirmationToken = async ({
	confirmationTokenRepository,
	contactId,
	verificationCode,
}: GetConfirmationTokenParams) => {
	const confirmationToken = await confirmationTokenRepository.findOne({
		where: {
			contactId,
			token: verificationCode,
		},
	});

	if (!confirmationToken) {
		return errorUtil.notFound(["Invalid contactId or verificationCode"]);
	}

	return confirmationToken;
};
