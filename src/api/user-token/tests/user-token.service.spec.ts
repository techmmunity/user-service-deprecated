import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";

import { UserTokenService } from "../user-token.service";

import { UserTokenEntity } from "../user-token.entity";

describe("UserTokenService", () => {
	let service: UserTokenService;

	const mockRepository = {
		save: jest.fn(),
	};

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				UserTokenService,
				{
					provide: getRepositoryToken(UserTokenEntity),
					useValue: mockRepository,
				},
			],
		}).compile();

		service = module.get<UserTokenService>(UserTokenService);
	});

	it("should be defined", () => {
		expect(service).toBeDefined();
	});
});
