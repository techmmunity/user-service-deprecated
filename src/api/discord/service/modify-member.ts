import { DISCORD } from "config/discord";

export type ModifyMemberParams = {
	userId: string;
	defaultNick?: string;
	defaultRoles?: Array<string>;
};

const { DISCORD_BOT_TOKEN } = process.env;

export const modifyMember = ({
	userId,
	defaultNick,
	defaultRoles,
}: ModifyMemberParams) =>
	fetch(
		`${DISCORD.API_URL}/guilds/${DISCORD.GUILD_ID_DEVELOPER}/members/${userId}`,
		{
			method: "PATCH",
			body: JSON.stringify({
				nick: defaultNick,
				roles: defaultRoles,
			}),
			headers: {
				Authorization: `Bot ${DISCORD_BOT_TOKEN}`,
				"Content-Type": " application/json",
			},
		},
	);
