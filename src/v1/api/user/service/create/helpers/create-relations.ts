import { UserTokenService } from "v1/api/user-token/user-token.service";
import { VerifyAccountService } from "v1/api/verify-account/verify-account.service";

import { IntegrationsEnum } from "core/enums/integrations";

interface UserTokenData {
	type: IntegrationsEnum;
	accessToken: string;
	refreshToken: string;
	expirationDate: Date;
}

export interface CreateRelationsParams {
	UserTokenService: UserTokenService;
	VerifyAccountService: VerifyAccountService;
	userId: string;
	userTokenData?: UserTokenData;
}

export const createRelations = async ({
	UserTokenService,
	VerifyAccountService,
	userId,
	userTokenData = {} as UserTokenData,
}: CreateRelationsParams) => {
	const [verificationCode] = await Promise.all([
		VerifyAccountService.create(userId),
		UserTokenService.create({
			userId,
			...userTokenData,
		}),
	]);

	return {
		verificationCode,
	};
};
