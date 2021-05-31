import * as moment from "moment";

import type { ConfirmationTokenEntity } from "v1/api/confirmation-token/confirmation-token.entity";

import { errorUtil } from "v1/utils/error";

import { CONFIRMATION_TOKEN_EXPIRATION } from "v1/config/confirmation-token";

export const validateExpired = (confirmationToken: ConfirmationTokenEntity) => {
	const type = confirmationToken.type;

	const now = moment();

	const expirationDateLimit = moment(confirmationToken.createdAt).add(
		CONFIRMATION_TOKEN_EXPIRATION[type].amount,
		CONFIRMATION_TOKEN_EXPIRATION[type].unit,
	);

	if (now.isAfter(expirationDateLimit)) {
		return errorUtil.conflict(["Confirmation token is expired"]);
	}
};
