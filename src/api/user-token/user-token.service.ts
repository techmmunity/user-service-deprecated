import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { create } from "api/user-token/service/create";
import {
	updateToken,
	UpdateTokenParams,
} from "api/user-token/service/update-token";

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

	public updateToken(data: Omit<UpdateTokenParams, "UserTokenRepository">) {
		return updateToken({
			UserTokenRepository: this.UserTokenRepository,
			...data,
		});
	}
}
