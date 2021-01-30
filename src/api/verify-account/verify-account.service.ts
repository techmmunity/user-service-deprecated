import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { createVerificationCode } from "./service/create-verification-code";
import { verifyAccount } from "./service/verify-account";

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
		return createVerificationCode({
			userId,
			VerifyAccountRepository: this.VerifyAccountRepository,
		});
	}

	public verify(confirmationCode: string) {
		return verifyAccount({
			confirmationCode,
			VerifyAccountRepository: this.VerifyAccountRepository,
		});
	}
}
