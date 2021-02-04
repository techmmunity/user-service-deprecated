import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";

import { MockRepository } from "../repository";

import { SettingsService } from "api/settings/settings.service";

import { SettingsEntity } from "api/settings/settings.entity";

export const service = (mockRepository: MockRepository) => async () => {
	const module: TestingModule = await Test.createTestingModule({
		providers: [
			SettingsService,
			{
				provide: getRepositoryToken(SettingsEntity),
				useValue: mockRepository,
			},
		],
	}).compile();

	return module.get<SettingsService>(SettingsService);
};
