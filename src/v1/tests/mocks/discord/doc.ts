export interface CreateDoc {
	userId: string;
	discordUserId: string;
	discordAccessToken: string;
	discordRefreshToken: string;
	discordExpirationDate: Date;
	createdAt?: Date;
	updatedAt?: Date;
}

export const doc = ({
	userId,
	discordUserId,
	discordAccessToken,
	discordRefreshToken,
	discordExpirationDate,
	createdAt,
	updatedAt,
}: CreateDoc) => ({
	userId,
	discordUserId,
	discordAccessToken,
	discordRefreshToken,
	discordExpirationDate,
	createdAt: createdAt || new Date(),
	updatedAt: updatedAt || new Date(),
});
