import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import {
	updateToken,
	UpdateTokenParams,
} from "api/user-token/service/update-token";

import { UserTokenEntity, UserTokenRepository } from "./user-token.entity";

@Injectable()
export class UserTokenService {
	public constructor(
		@InjectRepository(UserTokenEntity)
		private readonly UserTokenRepository: UserTokenRepository,
	) {
		//
	}

	public updateToken(data: Omit<UpdateTokenParams, "UserTokenRepository">) {
		return updateToken({
			UserTokenRepository: this.UserTokenRepository,
			...data,
		});
	}
}
