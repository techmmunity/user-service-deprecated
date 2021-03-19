import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Transactional } from "typeorm-transactional-cls-hooked";

import { SettingsService } from "v1/api/settings/settings.service";
import { TutorialService } from "v1/api/tutorial/tutorial.service";
import { UserTokenService } from "v1/api/user-token/user-token.service";
import { VerifyAccountService as VerifyAccountServiceDependency } from "v1/api/verify-account/verify-account.service";

import { createDiscord, CreateDiscordParams } from "./service/create/discord";
import { createLocal, CreateLocalParams } from "./service/create/local";
import { findById, FindByIdParams } from "./service/find-by-id";
import { regenPin, RegenPinParams } from "./service/regen-pin";
import { verify, VerifyParams } from "./service/verify";

import { UserEntity, UserRepository } from "v1/api/user/user.entity";

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

	@Transactional()
	public createLocal(params: CreateLocalParams) {
		return createLocal({
			...this.repositoriesAndServices,
			...params,
		});
	}

	@Transactional()
	public createDiscord(params: CreateDiscordParams) {
		return createDiscord({
			...this.repositoriesAndServices,
			...params,
		});
	}

	@Transactional()
	public verify(params: VerifyParams) {
		return verify({
			UserRepository: this.UserRepository,
			...params,
		});
	}

	@Transactional()
	public findById(params: FindByIdParams) {
		return findById({
			UserRepository: this.UserRepository,
			...params,
		});
	}

	@Transactional()
	public regenPin(params: RegenPinParams) {
		return regenPin({
			UserRepository: this.UserRepository,
			...params,
		});
	}
}
