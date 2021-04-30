import * as moment from "moment";

import { validate } from "./validate";

import { getConfirmationToken } from "./helpers/get-confirmation-token";
import { validateExpired } from "./helpers/validate-expired";
import { validateUsed } from "./helpers/validate-used";

import { ConfirmationTokenRepository } from "v1/api/confirmation-token/confirmation-token.entity";

interface Injectables {
	ConfirmationTokenRepository: ConfirmationTokenRepository;
}

export interface VerifyParams {
	contactId: string;
	verificationCode: string;
}

export const verify = async (
	{ ConfirmationTokenRepository }: Injectables,
	params: VerifyParams,
) => {
	await validate(params);

	const confirmationToken = await getConfirmationToken({
		ConfirmationTokenRepository,
		...params,
	});

	validateUsed(confirmationToken);

	validateExpired(confirmationToken);

	await ConfirmationTokenRepository.update(confirmationToken.id, {
		usedAt: moment().toDate(),
		contact: {
			verified: true,
		},
	});
};
