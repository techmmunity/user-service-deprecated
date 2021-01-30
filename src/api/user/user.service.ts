import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { DiscordService } from "api/discord/discord.service";
import { GameficationService } from "api/gamefication/gamefication.service";

import { create } from "./service/create";
import { createConfirmationCode } from "./service/create-confirmation-code";
import { CreateUser } from "./service/create/types";
import { findBy } from "./service/find/find-by";
import { findOneBy } from "./service/find/find-one-by";
import { getCompleteData } from "./service/find/get-complete-data";
import { getProfile } from "./service/get-profile";
import { updateToken, UpdateTokenParams } from "./service/update-token";
import { verifyAccount } from "./service/verify-account";

import { SettingEntity, SettingRepository } from "api/settings/setting.entity";
import {
	TutorialEntity,
	TutorialRepository,
} from "api/tutorial/tutorial.entity";
import {
	UserTokenEntity,
	UserTokenRepository,
} from "api/user-token/user-token.entity";
import {
	UserFindMany,
	UserFindOne,
	UserEntity,
	UserRepository,
} from "api/user/user.entity";
import {
	VerifyAccountEntity,
	VerifyAccountRepository,
} from "api/verify-account/verify-account.entity";

@Injectable()
export class UserService {
	public constructor(
		private readonly DiscordService: DiscordService,
		private readonly GameficationService: GameficationService,
		@InjectRepository(VerifyAccountEntity)
		private readonly VerifyAccountRepository: VerifyAccountRepository,
		@InjectRepository(SettingEntity)
		private readonly SettingRepository: SettingRepository,
		@InjectRepository(TutorialEntity)
		private readonly TutorialRepository: TutorialRepository,
		@InjectRepository(UserEntity)
		private readonly UserRepository: UserRepository,
		@InjectRepository(UserTokenEntity)
		private readonly UserTokenRepository: UserTokenRepository,
	) {
		//
	}

	private get repositories() {
		return {
			VerifyAccountRepository: this.VerifyAccountRepository,
			SettingRepository: this.SettingRepository,
			TutorialRepository: this.TutorialRepository,
			UserRepository: this.UserRepository,
			UserTokenRepository: this.UserTokenRepository,
		};
	}

	/**
	 *
	 * User
	 *
	 */

	public create(params: CreateUser) {
		return create({
			DiscordService: this.DiscordService,
			GameficationService: this.GameficationService,
			...params,
			...this.repositories,
		});
	}

	public findBy(options?: UserFindMany) {
		return findBy({
			options,
			...this.repositories,
		});
	}

	public findOneBy(options?: UserFindOne) {
		return findOneBy({
			options,
			...this.repositories,
		});
	}

	public getCompleteData(query?: UserFindOne) {
		return getCompleteData({
			query,
			GameficationService: this.GameficationService,
			...this.repositories,
		});
	}

	public getProfile(username: string) {
		return getProfile({
			username,
			UserRepository: this.UserRepository,
			GameficationService: this.GameficationService,
		});
	}

	/**
	 *
	 * User Token
	 *
	 */

	public updateToken(data: Omit<UpdateTokenParams, "UserTokenRepository">) {
		return updateToken({
			UserTokenRepository: this.UserTokenRepository,
			...data,
		});
	}

	/**
	 *
	 * Confirm Email
	 *
	 */

	public createConfirmationCode(userId: string) {
		return createConfirmationCode({
			userId,
			VerifyAccountRepository: this.VerifyAccountRepository,
		});
	}

	public verifyAccount(confirmationCode: string) {
		return verifyAccount({
			confirmationCode,
			UserRepository: this.UserRepository,
			VerifyAccountRepository: this.VerifyAccountRepository,
		});
	}
}
