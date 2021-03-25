import { Module } from "@nestjs/common";

import { Api } from "./api";

import { PostgresConnect } from "v1/config/postgres";
import { GoogleModule } from './api/google/google.module';
import { DiscordModule } from './api/discord/discord.module';
import { GithubModule } from './api/github/github.module';
import { LinkedinModule } from './api/linkedin/linkedin.module';

@Module({
	imports: [PostgresConnect, ...Api, GoogleModule, DiscordModule, GithubModule, LinkedinModule],
})
export class V1Module {
	//
}
