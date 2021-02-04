import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";

import { SettingsService } from "../settings.service";

import { SettingsEntity } from "../settings.entity";

describe("SettingsService", () => {
	let service: SettingsService;

	const mockRepository = {
		save: jest.fn(),
	};

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				SettingsService,
				{
					provide: getRepositoryToken(SettingsEntity),
					useValue: mockRepository,
				},
			],
		}).compile();

		service = module.get<SettingsService>(SettingsService);
	});

	it("should be defined", () => {
		expect(service).toBeDefined();
	});
});
