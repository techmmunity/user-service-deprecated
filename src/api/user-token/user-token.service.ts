import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { create } from "api/user-token/service/create";
import { update, UpdateTokenParams } from "api/user-token/service/update";

import {
	UserTokenEntity,
	UserTokenRepository,
	UserTokenType,
} from "./user-token.entity";

@Injectable()
export class UserTokenService {
	public constructor(
		@InjectRepository(UserTokenEntity)
		private readonly UserTokenRepository: UserTokenRepository,
	) {
		//
	}

	public create(data: UserTokenType) {
		return create({
			UserTokenRepository: this.UserTokenRepository,
			...data,
		});
	}

	public update(data: Omit<UpdateTokenParams, "UserTokenRepository">) {
		return update({
			UserTokenRepository: this.UserTokenRepository,
			...data,
		});
	}
}
