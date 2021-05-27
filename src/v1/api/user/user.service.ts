import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Transactional } from "typeorm-transactional-cls-hooked";

import {
	changePassword,
	ChangePasswordParams,
} from "./service/change-password";
import { createDiscord, CreateDiscordParams } from "./service/create/discord";
import { createLocal, CreateLocalParams } from "./service/create/local";
import { find, FindParams } from "./service/find";
import { loginLocal, LoginLocalParams } from "./service/login/local";
import { regenPin, RegenPinParams } from "./service/regen-pin";

import {
	ConfirmationTokenEntity,
	ConfirmationTokenRepository,
} from "../confirmation-token/confirmation-token.entity";
import { ContactEntity, ContactRepository } from "../contact/contact.entity";
import { UserEntity, UserRepository } from "v1/api/user/user.entity";

@Injectable()
export class UserService {
	public constructor(
		@InjectRepository(ConfirmationTokenEntity)
		private readonly ConfirmationTokenRepository: ConfirmationTokenRepository,
		@InjectRepository(ContactEntity)
		private readonly ContactRepository: ContactRepository,
		@InjectRepository(UserEntity)
		private readonly UserRepository: UserRepository,
	) {}

	@Transactional()
	public createLocal(params: CreateLocalParams) {
		return createLocal(
			{
				ConfirmationTokenRepository: this.ConfirmationTokenRepository,
				UserRepository: this.UserRepository,
			},
			params,
		);
	}

	@Transactional()
	public createDiscord(params: CreateDiscordParams) {
		return createDiscord(
			{
				UserRepository: this.UserRepository,
			},
			params,
		);
	}

	@Transactional()
	public loginLocal(params: LoginLocalParams) {
		return loginLocal(
			{
				UserRepository: this.UserRepository,
			},
			params,
		);
	}

	@Transactional()
	public regenPin(params: RegenPinParams) {
		return regenPin(
			{
				UserRepository: this.UserRepository,
			},
			params,
		);
	}

	@Transactional()
	public find(params: FindParams) {
		return find(
			{
				ContactRepository: this.ContactRepository,
				UserRepository: this.UserRepository,
			},
			params,
		);
	}

	@Transactional()
	public changePassword(params: ChangePasswordParams) {
		return changePassword(
			{
				ConfirmationTokenRepository: this.ConfirmationTokenRepository,
				UserRepository: this.UserRepository,
			},
			params,
		);
	}
}
