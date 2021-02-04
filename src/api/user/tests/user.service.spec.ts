import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";

import { UserService } from "../user.service";
import { SettingsService } from "api/settings/settings.service";
import { TutorialService } from "api/tutorial/tutorial.service";
import { UserTokenService } from "api/user-token/user-token.service";
import { VerifyAccountService } from "api/verify-account/verify-account.service";

import { UserEntity } from "../user.entity";

import { TestUtil } from "utils/test";

describe("UserService", () => {
	let service: UserService;

	const mockUserRepository = TestUtil.createMockRepository();
	const mockSettingsService = {
		create: jest.fn(),
	};
	const mockTutorialService = {
		create: jest.fn(),
	};
	const mockUserTokenService = {
		create: jest.fn(),
	};
	const mockVerifyAccountService = {
		create: jest.fn(),
	};

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				UserService,
				{
					provide: getRepositoryToken(UserEntity),
					useValue: mockUserRepository,
				},
				{
					provide: SettingsService,
					useValue: mockSettingsService,
				},
				{
					provide: TutorialService,
					useValue: mockTutorialService,
				},
				{
					provide: UserTokenService,
					useValue: mockUserTokenService,
				},
				{
					provide: VerifyAccountService,
					useValue: mockVerifyAccountService,
				},
			],
		}).compile();

		service = module.get<UserService>(UserService);
	});

	it("should be defined", () => {
		expect(service).toBeDefined();
	});
});
