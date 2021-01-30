/* eslint-disable camelcase */

export interface DiscordGuild {
	id: string;
	name: string;
	icon: string;
	owner: boolean;
	permissions: number;
	features: Array<Array<any>>;
	permissions_new: string;
}

export interface DiscordProfile {
	id: string;
	username: string;
	avatar: string;
	discriminator: string;
	public_flags: number;
	flags: number;
	email: string;
	verified: boolean;
	locale: "en-US" | "pt-BR";
	mfa_enabled: boolean;
}

export interface DiscordToken {
	access_token: string;
	refresh_token: string;
	expires_in: number;
	scope: string;
	token_type: "Bearer";
}

export interface DiscordTokenFormated {
	accessToken: string;
	refreshToken: string;
	expirationDate: Date;
}

export interface DiscordError {
	error: string;
}
