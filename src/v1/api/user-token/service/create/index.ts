import { validate } from "./validation";

import {
	UserTokenRepository,
	UserTokenType,
} from "v1/api/user-token/user-token.entity";

import { IntegrationsEnum } from "core/enums/integrations";

interface Injectables {
	UserTokenRepository: UserTokenRepository;
}

export interface CreateParams {
	userId: string;
	type?: IntegrationsEnum;
	accessToken?: string;
	refreshToken?: string;
	expirationDate?: Date;
}

const getUserTokenData = ({
	userId,
	type,
	accessToken,
	refreshToken,
	expirationDate,
}: CreateParams) => {
	const userTokenData = {
		id: userId,
	} as UserTokenType;

	switch (type) {
		case IntegrationsEnum.DISCORD:
			userTokenData.discordAccessToken = accessToken;
			userTokenData.discordRefreshToken = refreshToken;
			userTokenData.discordExpirationDate = expirationDate;
			break;
		case IntegrationsEnum.GITHUB:
			userTokenData.githubAccessToken = accessToken;
			userTokenData.githubRefreshToken = refreshToken;
			userTokenData.githubExpirationDate = expirationDate;
			break;
		case IntegrationsEnum.GOOGLE:
			userTokenData.googleAccessToken = accessToken;
			userTokenData.googleRefreshToken = refreshToken;
			userTokenData.googleExpirationDate = expirationDate;
			break;
		case IntegrationsEnum.LINKEDIN:
			userTokenData.linkedinAccessToken = accessToken;
			userTokenData.linkedinRefreshToken = refreshToken;
			userTokenData.linkedinExpirationDate = expirationDate;
			break;
	}

	return userTokenData;
};

export const create = async ({
	UserTokenRepository,
	...params
}: CreateParams & Injectables) => {
	await validate(params);

	const userTokenData = getUserTokenData(params);

	return UserTokenRepository.save(userTokenData);
};
