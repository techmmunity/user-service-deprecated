import { URLSearchParams } from "url";

import { getGuildId } from "./get-guild-id";
import { getRoles } from "./get-roles";

import { HeadlineEnum } from "core/enums/headline";
import { LanguageEnum } from "core/enums/language";

import { DISCORD } from "config/discord";

export type RegisterMemberOnDiscordParams = {
	userId: string;
	birthday: Date;
	nick: string;
	accessToken: string;
	language?: LanguageEnum;
	headline?: HeadlineEnum;
};

interface AddMemberToGuildParams {
	guildId: string;
	userId: string;
	nick: string;
	roles: Array<string>;
	accessToken: string;
}

const { DISCORD_BOT_TOKEN } = process.env;

const addMemberToGuild = ({
	guildId,
	userId,
	nick,
	roles,
	accessToken,
}: AddMemberToGuildParams) =>
	fetch(`${DISCORD.API_URL}/guilds/${guildId}/members/${userId}`, {
		method: "PUT",
		body: new URLSearchParams({
			nick,
			roles,
			access_token: accessToken,
		}),
		headers: {
			Authorization: `Bot ${DISCORD_BOT_TOKEN}`,
			"Content-Type": " application/json",
		},
	});

const modifyMember = ({
	guildId,
	userId,
	nick,
	roles,
}: Omit<AddMemberToGuildParams, "accessToken">) =>
	fetch(`${DISCORD.API_URL}/guilds/${guildId}/members/${userId}`, {
		method: "PATCH",
		body: new URLSearchParams({
			nick,
			roles,
		}),
		headers: {
			Authorization: `Bot ${DISCORD_BOT_TOKEN}`,
			"Content-Type": " application/json",
		},
	});

export const registerMemberOnDiscord = async ({
	userId,
	birthday,
	accessToken,
	nick,
	language,
	headline,
}: RegisterMemberOnDiscordParams) => {
	const guildId = getGuildId(headline);

	if (!guildId) return;

	const roles = getRoles({
		guildId,
		birthday,
		language,
	});

	let response = await addMemberToGuild({
		guildId,
		userId,
		nick,
		roles,
		accessToken,
	});

	if (response.status === 204) {
		response = await modifyMember({
			guildId,
			userId,
			nick,
			roles,
		});
	}

	if (![201, 204].includes(response.status)) {
		// Erro ao sincronizar usuário
		console.error(await response.json());

		return false;
	}

	return true;
};
