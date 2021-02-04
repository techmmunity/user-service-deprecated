import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";

import { VerifyAccountService } from "../verify-account.service";

import { VerifyAccountEntity } from "../verify-account.entity";

describe("VerifyAccountService", () => {
	let service: VerifyAccountService;

	const mockRepository = {
		insert: jest.fn(),
		findOne: jest.fn(),
		update: jest.fn(),
	};

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				VerifyAccountService,
				{
					provide: getRepositoryToken(VerifyAccountEntity),
					useValue: mockRepository,
				},
			],
		}).compile();

		service = module.get<VerifyAccountService>(VerifyAccountService);
	});

	it("should be defined", () => {
		expect(service).toBeDefined();
	});
});
