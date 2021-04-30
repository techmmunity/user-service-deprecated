import * as moment from "moment";

import { ConfirmationTokenEntity } from "v1/api/confirmation-token/confirmation-token.entity";

import { ErrorUtil } from "v1/utils/error";

import { ConfirmationTokenExpiration } from "v1/config/confirmation-token";

export const validateExpired = (confirmationToken: ConfirmationTokenEntity) => {
	const type = confirmationToken.type;

	const now = moment();

	const expirationDateLimit = moment(confirmationToken.createdAt).add(
		ConfirmationTokenExpiration[type].amount,
		ConfirmationTokenExpiration[type].unit,
	);

	if (now.isAfter(expirationDateLimit)) {
		return ErrorUtil.conflict(["Confirmation token is expired"]);
	}
};
