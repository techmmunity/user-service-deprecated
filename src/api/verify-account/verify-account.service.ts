import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { UserService as UserServiceDependency } from "api/user/user.service";

import { create } from "./service/create";
import { verify } from "./service/verify";

import {
	VerifyAccountEntity,
	VerifyAccountRepository,
} from "./verify-account.entity";

@Injectable()
export class VerifyAccountService {
	public constructor(
		@Inject(forwardRef(() => UserServiceDependency))
		private readonly UserService: UserServiceDependency,
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
			UserService: this.UserService,
			VerifyAccountRepository: this.VerifyAccountRepository,
			confirmationCode,
		});
	}
}
