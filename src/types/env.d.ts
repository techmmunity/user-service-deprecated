/* eslint-disable @typescript-eslint/naming-convention */

declare global {
	namespace NodeJS {
		interface ProcessEnv {
			NODE_ENV: "dev" | "production" | "homolog" | "test";
			PORT: string;
			FRONT_URL: string;
			MONGO_USER: string;
			MONGO_PASSWORD: string;
			MONGO_DB: string;
			DISCORD_BOT_TOKEN: string;
			DISCORD_CLIENT_ID: string;
			DISCORD_CLIENT_SECRET: string;
			DISCORD_REDIRECT_URL: string;
		}
	}
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
// eslint-disable-next-line prettier/prettier
export { };
