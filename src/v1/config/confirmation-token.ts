import * as moment from "moment";

import { ConfirmationTokenTypeEnum } from "core/enums/confirmation-token-type";

type ConfirmationTokenConfigType = {
	[key in ConfirmationTokenTypeEnum]: {
		amount: number;
		unit: moment.unitOfTime.Base;
	};
};

export const CONFIRMATION_TOKEN_EXPIRATION: ConfirmationTokenConfigType = {
	[ConfirmationTokenTypeEnum.VERIFY_CONTACT]: {
		amount: 3,
		unit: "hours",
	},
	[ConfirmationTokenTypeEnum.CHANGE_PASSWORD]: {
		amount: 3,
		unit: "hours",
	},
	[ConfirmationTokenTypeEnum.REMOVE_CONTACT]: {
		amount: 3,
		unit: "hours",
	},
};
