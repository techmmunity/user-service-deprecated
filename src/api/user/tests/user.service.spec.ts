import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";

import { UserService } from "../user.service";

import { UserEntity } from "../user.entity";

import { TestUtil } from "utils/test";

describe("UserService", () => {
	let service: UserService;

	const mockUserRepository = TestUtil.createRepositoryMock();

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				UserService,
				{
					provide: getRepositoryToken(UserEntity),
					useValue: mockUserRepository,
				},
			],
		}).compile();

		service = module.get<UserService>(UserService);
	});

	it("should be defined", () => {
		expect(service).toBeDefined();
	});
});
