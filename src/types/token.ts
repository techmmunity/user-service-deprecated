import { StrategyEnum } from "core/enums/strategy";

export type Token = {
	id: string;
	discordUserId?: string;
	googleUserId?: string;
	githubUserId?: string;
	linkedinUserId?: string;
	username: string;
	permissions: Array<StrategyEnum>;
};
