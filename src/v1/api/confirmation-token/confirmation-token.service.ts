import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Transactional } from "typeorm-transactional-cls-hooked";

import { create, CreateParams } from "./service/create";
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
	public create(params: CreateParams) {
		return create(
			{
				ConfirmationTokenRepository: this.ConfirmationTokenRepository,
			},
			params,
		);
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
