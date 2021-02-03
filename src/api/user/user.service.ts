import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { SettingsService } from "api/settings/settings.service";
import { TutorialService } from "api/tutorial/tutorial.service";
import { UserTokenService } from "api/user-token/user-token.service";
import { VerifyAccountService } from "api/verify-account/verify-account.service";

import { createDiscord, CreateDiscordParams } from "./service/create/discord";
import { createLocal, CreateLocalParams } from "./service/create/local";

import { UserEntity, UserRepository } from "api/user/user.entity";

@Injectable()
export class UserService {
	public constructor(
		private readonly SettingsService: SettingsService,
		private readonly TutorialService: TutorialService,
		private readonly UserTokenService: UserTokenService,
		private readonly VerifyAccountService: VerifyAccountService,
		@InjectRepository(UserEntity)
		private readonly UserRepository: UserRepository,
	) {
		//
	}

	private get repositoriesAndServices() {
		return {
			TutorialService: this.TutorialService,
			SettingsService: this.SettingsService,
			UserTokenService: this.UserTokenService,
			UserRepository: this.UserRepository,
			VerifyAccountService: this.VerifyAccountService,
		};
	}

	public createLocal(params: CreateLocalParams) {
		return createLocal({
			...this.repositoriesAndServices,
			...params,
		});
	}

	public createDiscord(params: CreateDiscordParams) {
		return createDiscord({
			...this.repositoriesAndServices,
			...params,
		});
	}
}
