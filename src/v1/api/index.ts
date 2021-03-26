import { DiscordModule } from "v1/api/discord/discord.module";
import { GithubModule } from "v1/api/github/github.module";
import { GoogleModule } from "v1/api/google/google.module";
import { LinkedinModule } from "v1/api/linkedin/linkedin.module";
import { UserModule } from "v1/api/user/user.module";

export const Api = [
	DiscordModule,
	GithubModule,
	GoogleModule,
	LinkedinModule,
	UserModule,
];
