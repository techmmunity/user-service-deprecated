import { UserTokenRepository } from "api/user-token/user-token.entity";

import { StrategyEnum } from "core/enums/strategy";

export interface UpdateTokenParams {
	UserTokenRepository: UserTokenRepository;
	type: Exclude<StrategyEnum, StrategyEnum.LOCAL>;
	userId: string;
	accessToken: string;
	refreshToken: string;
	expirationDate: Date;
}

export const updateToken = ({
	UserTokenRepository,
	type,
	userId,
	accessToken,
	refreshToken,
	expirationDate,
}: UpdateTokenParams) => {
	let key: "discord" | "google" | "linkedin" | "github";

	switch (type) {
		case StrategyEnum.DISCORD:
			key = "discord";
			break;
		case StrategyEnum.GITHUB:
			key = "github";
			break;
		case StrategyEnum.GOOGLE:
			key = "google";
			break;
		case StrategyEnum.LINKEDIN:
			key = "linkedin";
			break;
	}

	return UserTokenRepository.save(
		{
			userId,
		},
		{
			[key]: {
				accessToken,
				refreshToken,
				expirationDate,
			},
		},
	);
};