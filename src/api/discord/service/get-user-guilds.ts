import fetch from "node-fetch";

import { DISCORD } from "config/discord";

import { DiscordGuild } from "types/discord";

export const getUserGuilds = async (token: string) => {
	const req = await fetch(`${DISCORD.API_URL}/users/@me/guilds`, {
		method: "GET",
		headers: {
			authorization: `Bearer ${token}`,
		},
	});

	const res = await req.json();

	return res as Array<DiscordGuild>;
};
