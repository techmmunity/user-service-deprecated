import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";

import { MockRepository } from "../repository";

import { UserService } from "v1/api/user/user.service";

import { UserEntity } from "v1/api/user/user.entity";

export const service = (mockRepository: MockRepository) => async () => {
	const module: TestingModule = await Test.createTestingModule({
		providers: [
			UserService,
			{
				provide: getRepositoryToken(UserEntity),
				useValue: mockRepository,
			},
		],
	}).compile();

	return module.get<UserService>(UserService);
};