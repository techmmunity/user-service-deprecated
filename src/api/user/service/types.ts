import { DiscordService } from "api/discord/discord.service";
import { GameficationService } from "api/gamefication/gamefication.service";

import { SettingRepository } from "api/settings/setting.entity";
import { TutorialRepository } from "api/tutorial/tutorial.entity";
import { UserTokenRepository } from "api/user-token/user-token.entity";
import { UserRepository } from "api/user/user.entity";
import { VerifyAccountRepository } from "api/verify-account/verify-account.entity";

export interface BaseParams {
	DiscordService: DiscordService;
	GameficationService: GameficationService;
	VerifyAccountRepository: VerifyAccountRepository;
	SettingRepository: SettingRepository;
	TutorialRepository: TutorialRepository;
	UserRepository: UserRepository;
	UserTokenRepository: UserTokenRepository;
}
