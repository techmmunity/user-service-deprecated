import fetch from "node-fetch";
import { URLSearchParams } from "url";

import { getExpirationDate } from "./helpers/get-expiration-date";

import { DISCORD } from "config/discord";

import { DiscordToken, DiscordTokenFormated } from "types/discord";

const {
	FRONT_URL,
	DISCORD_CLIENT_ID,
	DISCORD_CLIENT_SECRET,
	DISCORD_REDIRECT_URL,
} = process.env;

export const refreshToken = async (refreshToken: string) => {
	const req = await fetch(`${DISCORD.OAUTH_URL}/token`, {
		method: "POST",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
		body: new URLSearchParams({
			client_id: DISCORD_CLIENT_ID,
			client_secret: DISCORD_CLIENT_SECRET,
			redirect_uri: `${FRONT_URL}${DISCORD_REDIRECT_URL}`,
			refresh_token: refreshToken,
			grant_type: "refresh_token",
			scope: DISCORD.SCOPES,
		}),
	});

	const res = (await req.json()) as DiscordToken;

	const expirationDate = getExpirationDate(res.expires_in);

	return {
		expirationDate,
		accessToken: res.access_token,
		refreshToken: res.refresh_token,
	} as DiscordTokenFormated;
};
