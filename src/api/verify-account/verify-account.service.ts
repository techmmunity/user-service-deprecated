import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { create } from "./service/create";
import { verify } from "./service/verify";

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

	public create(userId: string) {
		return create({
			userId,
			VerifyAccountRepository: this.VerifyAccountRepository,
		});
	}

	public verify(confirmationCode: string) {
		return verify({
			confirmationCode,
			VerifyAccountRepository: this.VerifyAccountRepository,
		});
	}
}
