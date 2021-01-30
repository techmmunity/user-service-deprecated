import { Injectable } from "@nestjs/common";

import { getAvatar, GetAvatarParams } from "./service/get-avatar";
import { getTokenByCode } from "./service/get-token-by-code";
import { getUserData } from "./service/get-user-data";
import { getUserGuilds } from "./service/get-user-guilds";
import { refreshToken } from "./service/refresh-token";
import {
	registerMemberOnDiscord,
	RegisterMemberOnDiscordParams,
} from "./service/register-member-on-discord";

@Injectable()
export class DiscordService {
	public getAvatar(params: GetAvatarParams) {
		return getAvatar(params);
	}

	public getTokenByCode(code: string) {
		return getTokenByCode(code);
	}

	public getUserData(token: string) {
		return getUserData(token);
	}

	public getUserGuilds(token: string) {
		return getUserGuilds(token);
	}

	public refreshToken(refreshTokenParam: string) {
		return refreshToken(refreshTokenParam);
	}

	public registerMemberOnDiscord(params: RegisterMemberOnDiscordParams) {
		return registerMemberOnDiscord(params);
	}
}
