import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";

import { MockRepository } from "../repository";
import { UserMock } from "../user";
import { UserTokenMock } from "../user-token";

import { UserTokenService } from "v1/api/user-token/user-token.service";
import { UserService } from "v1/api/user/user.service";
import { VerifyAccountService } from "v1/api/verify-account/verify-account.service";

import { UserTokenEntity } from "v1/api/user-token/user-token.entity";
import { UserEntity } from "v1/api/user/user.entity";
import { VerifyAccountEntity } from "v1/api/verify-account/verify-account.entity";

export const service = (mockRepository: MockRepository) => async () => {
	const module: TestingModule = await Test.createTestingModule({
		providers: [
			VerifyAccountService,
			UserService,
			UserTokenService,
			{
				provide: getRepositoryToken(VerifyAccountEntity),
				useValue: mockRepository,
			},
			{
				provide: getRepositoryToken(UserEntity),
				useValue: UserMock.repository,
			},
			{
				provide: getRepositoryToken(UserTokenEntity),
				useValue: UserTokenMock.repository,
			},
		],
	}).compile();

	return module.get<VerifyAccountService>(VerifyAccountService);
};
