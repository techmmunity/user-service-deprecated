import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";

import { MockRepository } from "../repository";
import { UserTokenMock } from "../user-token";
import { VerifyAccountMock } from "../verify-account";

import { UserTokenService } from "v1/api/user-token/user-token.service";
import { UserService } from "v1/api/user/user.service";
import { VerifyAccountService } from "v1/api/verify-account/verify-account.service";

import { UserTokenEntity } from "v1/api/user-token/user-token.entity";
import { UserEntity } from "v1/api/user/user.entity";
import { VerifyAccountEntity } from "v1/api/verify-account/verify-account.entity";

export const service = (mockRepository: MockRepository) => async () => {
	const module: TestingModule = await Test.createTestingModule({
		providers: [
			UserService,
			VerifyAccountService,
			UserTokenService,
			{
				provide: getRepositoryToken(UserEntity),
				useValue: mockRepository,
			},
			{
				provide: getRepositoryToken(VerifyAccountEntity),
				useValue: VerifyAccountMock.repository,
			},
			{
				provide: getRepositoryToken(UserTokenEntity),
				useValue: UserTokenMock.repository,
			},
		],
	}).compile();

	return module.get<UserService>(UserService);
};
