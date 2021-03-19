import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Transactional } from "typeorm-transactional-cls-hooked";

import { UserService as UserServiceDependency } from "v1/api/user/user.service";

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

	@Transactional()
	public create(userId: string) {
		return create({
			userId,
			VerifyAccountRepository: this.VerifyAccountRepository,
		});
	}

	@Transactional()
	public verify(confirmationCode: string) {
		return verify({
			UserService: this.UserService,
			VerifyAccountRepository: this.VerifyAccountRepository,
			confirmationCode,
		});
	}
}
