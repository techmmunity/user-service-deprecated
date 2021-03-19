/* eslint-disable @typescript-eslint/naming-convention */

declare global {
	namespace NodeJS {
		interface ProcessEnv {
			NODE_ENV: "dev" | "production" | "homolog" | "test";
			PORT: string;
			POSTGRES_USER: string;
			POSTGRES_PASSWORD: string;
			POSTGRES_HOST: string;
			POSTGRES_DATABSE: string;
		}
	}
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
// eslint-disable-next-line prettier/prettier
export {};
