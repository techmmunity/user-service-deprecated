import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Transactional } from "typeorm-transactional-cls-hooked";

import { verify, VerifyParams } from "./service/verify";

import {
	ConfirmationTokenEntity,
	ConfirmationTokenRepository,
} from "./confirmation-token.entity";

@Injectable()
export class ConfirmationTokenService {
	public constructor(
		@InjectRepository(ConfirmationTokenEntity)
		private readonly ConfirmationTokenRepository: ConfirmationTokenRepository,
	) {
		//
	}

	@Transactional()
	public verify(params: VerifyParams) {
		return verify(
			{
				ConfirmationTokenRepository: this.ConfirmationTokenRepository,
			},
			params,
		);
	}
}
