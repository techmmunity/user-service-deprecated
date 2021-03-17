import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";

import { MockRepository } from "../repository";

import { TutorialService } from "api/tutorial/tutorial.service";

import { TutorialEntity } from "api/tutorial/tutorial.entity";

export const service = (mockRepository: MockRepository) => async () => {
	const module: TestingModule = await Test.createTestingModule({
		providers: [
			TutorialService,
			{
				provide: getRepositoryToken(TutorialEntity),
				useValue: mockRepository,
			},
		],
	}).compile();

	return module.get<TutorialService>(TutorialService);
};