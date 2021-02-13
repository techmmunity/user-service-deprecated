import { UserTokenRepository } from "api/user-token/user-token.entity";

import { IntegrationsEnum } from "core/enums/integrations";

interface Injectables {
	UserTokenRepository: UserTokenRepository;
}

export interface UpdateTokenParams {
	type: IntegrationsEnum;
	userId: string;
	accessToken: string;
	refreshToken: string;
	expirationDate: Date;
}

export const update = ({
	UserTokenRepository,
	type,
	userId,
	accessToken,
	refreshToken,
	expirationDate,
}: UpdateTokenParams & Injectables) => {
	return UserTokenRepository.save({
		id: userId,
		[`${type.toLowerCase()}accessToken`]: accessToken,
		[`${type.toLowerCase()}refreshToken`]: refreshToken,
		[`${type.toLowerCase()}expirationDate`]: expirationDate,
	});
};
