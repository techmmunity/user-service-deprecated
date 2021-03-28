import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Transactional } from "typeorm-transactional-cls-hooked";

import { createLocal, CreateLocalParams } from "./service/create/local";
import { loginLocal, LoginLocalParams } from "./service/login/local";
import { regenPin, RegenPinParams } from "./service/regen-pin";
import { verify, VerifyParams } from "./service/verify";

import { UserEntity, UserRepository } from "v1/api/user/user.entity";

@Injectable()
export class UserService {
	public constructor(
		@InjectRepository(UserEntity)
		private readonly UserRepository: UserRepository,
	) {
		//
	}

	@Transactional()
	public createLocal(params: CreateLocalParams) {
		return createLocal(
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
	public verify(params: VerifyParams) {
		return verify(
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
}
