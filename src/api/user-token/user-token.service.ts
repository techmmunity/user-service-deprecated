import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { create, CreateParams } from "api/user-token/service/create";
import { update, UpdateTokenParams } from "api/user-token/service/update";
import { Transactional } from "typeorm-transactional-cls-hooked";

import { UserTokenEntity, UserTokenRepository } from "./user-token.entity";

@Injectable()
export class UserTokenService {
	public constructor(
		@InjectRepository(UserTokenEntity)
		private readonly UserTokenRepository: UserTokenRepository,
	) {
		//
	}

	@Transactional()
	public create(data: CreateParams) {
		return create({
			UserTokenRepository: this.UserTokenRepository,
			...data,
		});
	}

	@Transactional()
	public update(data: UpdateTokenParams) {
		return update({
			UserTokenRepository: this.UserTokenRepository,
			...data,
		});
	}
}
