import { Injectable } from "@nestjs/common";

import {
	addMemberToGuild,
	AddMemberToGuildParams,
} from "./service/add-member-to-guild";
import { getAvatar, GetAvatarParams } from "./service/get-avatar";
import { getTokenByCode } from "./service/get-token-by-code";
import { getUserData } from "./service/get-user-data";
import { getUserGuilds } from "./service/get-user-guilds";
import { modifyMember, ModifyMemberParams } from "./service/modify-member";
import { refreshToken } from "./service/refresh-token";

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

	public addMemberToGuild(params: AddMemberToGuildParams) {
		return addMemberToGuild(params);
	}

	public modifyMember(params: ModifyMemberParams) {
		return modifyMember(params);
	}
}
