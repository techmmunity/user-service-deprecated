/* eslint-disable @typescript-eslint/naming-convention */

declare global {
	namespace NodeJS {
		interface ProcessEnv {
			NODE_ENV: "dev" | "production" | "homolog" | "test";
			PORT: string;
			HOST: string;
			FRONT_URL: string;
			SESSION_SECRET: string;
			MONGO_USER: string;
			MONGO_PASSWORD: string;
			MONGO_DB: string;
			MYSQL_USER: string;
			MYSQL_PASSWORD: string;
			MYSQL_DB: string;
			MYSQL_HOST: string;
			MYSQL_PORT: string;
			DISCORD_CLIENT_ID: string;
			DISCORD_CLIENT_SECRET: string;
			DISCORD_REDIRECT_URL: string;
			GOOGLE_CLIENT_ID: string;
			GOOGLE_CLIENT_SECRET: string;
			GOOGLE_REDIRECT_URL: string;
			EMAIL_HOST: string;
			EMAIL_PORT: string;
			EMAIL_EMAIL: string;
			EMAIL_PASSWORD: string;
			REDIS_HOST: string;
			REDIS_PORT: string;
			QUEUE_BOARD_USER: string;
			QUEUE_BOARD_PASSWORD: string;
		}
	}
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
// eslint-disable-next-line prettier/prettier
export { };
