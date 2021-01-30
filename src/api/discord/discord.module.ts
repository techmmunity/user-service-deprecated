import { Module } from "@nestjs/common";

import { DiscordService } from "./discord.service";

import { DiscordResolver } from "./discord.resolver";

@Module({
	providers: [DiscordService, DiscordResolver],
	exports: [DiscordService],
})
export class DiscordModule {
	//
}
