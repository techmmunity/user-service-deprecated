import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Transactional } from "typeorm-transactional-cls-hooked";

import { create, CreateParams } from "./service/create";
import { findById, FindByIdParams } from "./service/find-by-id";
import { regenPin, RegenPinParams } from "./service/regen-pin";

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
	public create(params: CreateParams) {
		return create(
			{
				UserRepository: this.UserRepository,
			},
			params,
		);
	}

	@Transactional()
	public findById(params: FindByIdParams) {
		return findById(
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
