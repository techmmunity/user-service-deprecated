import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { DiscordService } from "./discord.service";

import { DiscordController } from "./discord.controller";

import { ConfirmationTokenEntity } from "../confirmation-token/confirmation-token.entity";
import { DiscordEntity } from "./discord.entity";

@Module({
	imports: [TypeOrmModule.forFeature([DiscordEntity, ConfirmationTokenEntity])],
	controllers: [DiscordController],
	providers: [DiscordService],
})
export class DiscordModule {}
