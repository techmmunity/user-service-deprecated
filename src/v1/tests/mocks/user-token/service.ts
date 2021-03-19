import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";

import { MockRepository } from "../repository";

import { UserTokenService } from "v1/api/user-token/user-token.service";

import { UserTokenEntity } from "v1/api/user-token/user-token.entity";

export const service = (mockRepository: MockRepository) => async () => {
	const module: TestingModule = await Test.createTestingModule({
		providers: [
			UserTokenService,
			{
				provide: getRepositoryToken(UserTokenEntity),
				useValue: mockRepository,
			},
		],
	}).compile();

	return module.get<UserTokenService>(UserTokenService);
};
