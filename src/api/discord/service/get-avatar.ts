import { ErrorUtil } from "utils/error";

import { LimitsConfig } from "config/limits";

export interface GetAvatarParams {
	userId: string;
	avatarHash: string;
	size?: number;
}

const notAllowedSize = (size: number) =>
	size < LimitsConfig.discord.avatarDimentions.min ||
	size > LimitsConfig.discord.avatarDimentions.max;

export const getAvatar = ({
	userId,
	avatarHash,
	size: sizeParam,
}: GetAvatarParams) => {
	if (sizeParam && notAllowedSize(sizeParam)) {
		ErrorUtil.internal("INVALID_AVATAR_SIZE");
	}

	const size = sizeParam || 500;

	return `https://cdn.discordapp.com/avatars/${userId}/${avatarHash}.png?size=${size}`;
};
