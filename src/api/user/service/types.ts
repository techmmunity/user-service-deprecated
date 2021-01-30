import { DiscordService } from "api/discord/discord.service";
import { GameficationService } from "api/gamefication/gamefication.service";

import { SettingRepository } from "api/user/entities/setting.entity";
import { TutorialRepository } from "api/user/entities/tutorial.entity";
import { UserTokenRepository } from "api/user/entities/user-token.entity";
import { UserRepository } from "api/user/entities/user.entity";
import { VerifyAccountRepository } from "api/user/entities/verify-account.entity";

export interface BaseParams {
	DiscordService: DiscordService;
	GameficationService: GameficationService;
	VerifyAccountRepository: VerifyAccountRepository;
	SettingRepository: SettingRepository;
	TutorialRepository: TutorialRepository;
	UserRepository: UserRepository;
	UserTokenRepository: UserTokenRepository;
}
