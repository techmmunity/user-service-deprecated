import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Transactional } from "typeorm-transactional-cls-hooked";

import {
	changePassword,
	ChangePasswordParams,
} from "./service/change-password";
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
		private readonly confirmationTokenRepository: ConfirmationTokenRepository,
		@InjectRepository(ContactEntity)
		private readonly contactRepository: ContactRepository,
		@InjectRepository(UserEntity)
		private readonly userRepository: UserRepository,
	) {}

	@Transactional()
	public createLocal(params: CreateLocalParams) {
		return createLocal(
			{
				confirmationTokenRepository: this.confirmationTokenRepository,
				userRepository: this.userRepository,
			},
			params,
		);
	}

	@Transactional()
	public loginLocal(params: LoginLocalParams) {
		return loginLocal(
			{
				userRepository: this.userRepository,
			},
			params,
		);
	}

	@Transactional()
	public regenPin(params: RegenPinParams) {
		return regenPin(
			{
				userRepository: this.userRepository,
			},
			params,
		);
	}

	@Transactional()
	public find(params: FindParams) {
		return find(
			{
				contactRepository: this.contactRepository,
				userRepository: this.userRepository,
			},
			params,
		);
	}

	@Transactional()
	public changePassword(params: ChangePasswordParams) {
		return changePassword(
			{
				confirmationTokenRepository: this.confirmationTokenRepository,
				userRepository: this.userRepository,
			},
			params,
		);
	}
}
