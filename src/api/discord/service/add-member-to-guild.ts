import { URLSearchParams } from "url";

import { DISCORD } from "config/discord";

export type AddMemberToGuildParams = {
	userId: string;
	accessToken: string;
	defaultNick?: string;
	defaultRoles?: Array<string>;
};

const { DISCORD_BOT_TOKEN } = process.env;

export const addMemberToGuild = ({
	userId,
	accessToken,
	defaultNick,
	defaultRoles,
}: AddMemberToGuildParams) =>
	fetch(
		`${DISCORD.API_URL}/guilds/${DISCORD.GUILD_ID_DEVELOPER}/members/${userId}`,
		{
			method: "PUT",
			body: new URLSearchParams({
				access_token: accessToken,
				nick: defaultNick,
				roles: defaultRoles,
			}),
			headers: {
				Authorization: `Bot ${DISCORD_BOT_TOKEN}`,
				"Content-Type": " application/json",
			},
		},
	);
