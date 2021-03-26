import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Transactional } from "typeorm-transactional-cls-hooked";

import { create, CreateVerifyAccountParams } from "./service/create";
import { verify, VerifyAccountParams } from "./service/verify";

import {
	VerifyAccountEntity,
	VerifyAccountRepository,
} from "./verify-account.entity";

@Injectable()
export class VerifyAccountService {
	public constructor(
		@InjectRepository(VerifyAccountEntity)
		private readonly VerifyAccountRepository: VerifyAccountRepository,
	) {
		//
	}

	@Transactional()
	public create(params: CreateVerifyAccountParams) {
		return create(
			{
				VerifyAccountRepository: this.VerifyAccountRepository,
			},
			params,
		);
	}

	@Transactional()
	public verify(params: VerifyAccountParams) {
		return verify(
			{
				VerifyAccountRepository: this.VerifyAccountRepository,
			},
			params,
		);
	}
}
