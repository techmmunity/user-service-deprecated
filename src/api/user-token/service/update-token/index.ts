import { UserTokenRepository } from "api/user-token/user-token.entity";

export interface UpdateTokenParams {
	UserTokenRepository: UserTokenRepository;
	type: "discord" | "google" | "linkedin" | "github";
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
	return UserTokenRepository.save(
		{
			userId,
		},
		{
			[type]: {
				accessToken,
				refreshToken,
				expirationDate,
			},
		},
	);
};
