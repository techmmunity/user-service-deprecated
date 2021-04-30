import { ConfirmationTokenRepository } from "v1/api/confirmation-token/confirmation-token.entity";

import { ErrorUtil } from "v1/utils/error";

interface GetConfirmationTokenParams {
	ConfirmationTokenRepository: ConfirmationTokenRepository;
	contactId: string;
	verificationCode: string;
}

export const getConfirmationToken = async ({
	ConfirmationTokenRepository,
	contactId,
	verificationCode,
}: GetConfirmationTokenParams) => {
	const confirmationToken = await ConfirmationTokenRepository.findOne({
		where: {
			contactId: contactId,
			token: verificationCode,
		},
	});

	if (!confirmationToken) {
		return ErrorUtil.notFound(["Invalid contactId or verificationCode"]);
	}

	return confirmationToken;
};
