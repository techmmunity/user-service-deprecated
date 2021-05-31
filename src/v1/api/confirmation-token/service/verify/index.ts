import * as moment from "moment";

import { validateExpired } from "../../helpers/validate-expired";
import { validateUsed } from "../../helpers/validate-used";
import { getConfirmationToken } from "./helpers/get-confirmation-token";

import { validate } from "./validate";

import { ConfirmationTokenRepository } from "v1/api/confirmation-token/confirmation-token.entity";

interface Injectables {
	confirmationTokenRepository: ConfirmationTokenRepository;
}

export interface VerifyParams {
	contactId: string;
	verificationCode: string;
}

export const verify = async (
	{ confirmationTokenRepository }: Injectables,
	params: VerifyParams,
) => {
	await validate(params);

	const confirmationToken = await getConfirmationToken({
		confirmationTokenRepository,
		...params,
	});

	validateUsed(confirmationToken);

	validateExpired(confirmationToken);

	await confirmationTokenRepository.update(confirmationToken.id, {
		usedAt: moment().toDate(),
		contact: {
			verified: true,
		},
	});
};
