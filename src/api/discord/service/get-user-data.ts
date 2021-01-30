import fetch from "node-fetch";

import { DISCORD } from "config/discord";

import { DiscordProfile } from "types/discord";

export const getUserData = async (token: string) => {
	const req = await fetch(`${DISCORD.API_URL}/users/@me`, {
		method: "GET",
		headers: {
			authorization: `Bearer ${token}`,
		},
	});

	const res = await req.json();

	return res as DiscordProfile;
};
