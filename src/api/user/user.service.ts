import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { SettingsService } from "api/settings/settings.service";
import { TutorialService } from "api/tutorial/tutorial.service";
import { UserTokenService } from "api/user-token/user-token.service";
import { VerifyAccountService as VerifyAccountServiceDependency } from "api/verify-account/verify-account.service";

import { createDiscord, CreateDiscordParams } from "./service/create/discord";
import { createLocal, CreateLocalParams } from "./service/create/local";
import { verify, VerifyParams } from "./service/verify";

import { UserEntity, UserRepository } from "api/user/user.entity";

@Injectable()
export class UserService {
	public constructor(
		private readonly SettingsService: SettingsService,
		private readonly TutorialService: TutorialService,
		private readonly UserTokenService: UserTokenService,
		@Inject(forwardRef(() => VerifyAccountServiceDependency))
		private readonly VerifyAccountService: VerifyAccountServiceDependency,
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

	public verify(params: VerifyParams) {
		return verify({
			UserRepository: this.UserRepository,
			...params,
		});
	}
}
