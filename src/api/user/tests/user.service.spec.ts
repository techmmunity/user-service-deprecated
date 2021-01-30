import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";

import { UserService } from "../user.service";

import { UserEntity } from "../entities/user.entity";
import { SettingEntity } from "api/user/entities/setting.entity";
import { TutorialEntity } from "api/user/entities/tutorial.entity";
import { UserTokenEntity } from "api/user/entities/user-token.entity";

import { TestUtil } from "utils/test";

describe("UserService", () => {
	let service: UserService;

	const mockUserRepository = TestUtil.createRepositoryMock();
	const mockSettingRepository = TestUtil.createRepositoryMock();
	const mockTutorialRepository = TestUtil.createRepositoryMock();
	const mockUserTokenRepository = TestUtil.createRepositoryMock();

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				UserService,
				{
					provide: getRepositoryToken(UserEntity),
					useValue: mockUserRepository,
				},
				{
					provide: getRepositoryToken(SettingEntity),
					useValue: mockSettingRepository,
				},
				{
					provide: getRepositoryToken(TutorialEntity),
					useValue: mockTutorialRepository,
				},
				{
					provide: getRepositoryToken(UserTokenEntity),
					useValue: mockUserTokenRepository,
				},
			],
		}).compile();

		service = module.get<UserService>(UserService);
	});

	it("should be defined", () => {
		expect(service).toBeDefined();
	});
});
