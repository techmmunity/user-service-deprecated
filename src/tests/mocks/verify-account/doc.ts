import { v4 } from "uuid";

import { TimeUtil } from "utils/time";

export interface GetVerifyAccountDocsParams {
	userId: string;
	verifiedAt?: Date;
	createdAt?: Date;
}

export const doc = ({
	userId,
	verifiedAt,
	createdAt,
}: GetVerifyAccountDocsParams) => ({
	userId,
	verifiedAt,
	verificationCode: v4(),
	createdAt: createdAt || TimeUtil.newDate(),
});
