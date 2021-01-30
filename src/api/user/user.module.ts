import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { UserService } from "./user.service";
import { GameficationService } from "api/gamefication/gamefication.service";

import { DiscordModule } from "api/discord/discord.module";
import { GameficationModule } from "api/gamefication/gamefication.module";

import { UserResolver } from "./user.resolver";

import { SettingEntity } from "api/settings/setting.entity";
import { TutorialEntity } from "api/tutorial/tutorial.entity";
import { UserTokenEntity } from "api/user-token/user-token.entity";
import { UserEntity } from "api/user/user.entity";
import { VerifyAccountEntity } from "api/verify-account/verify-account.entity";

@Module({
	imports: [
		TypeOrmModule.forFeature([
			VerifyAccountEntity,
			SettingEntity,
			TutorialEntity,
			UserTokenEntity,
			UserEntity,
		]),
		DiscordModule,
		GameficationModule,
	],
	providers: [UserService, UserResolver, DiscordModule, GameficationService],
	exports: [UserService],
})
export class UserModule {
	//
}
