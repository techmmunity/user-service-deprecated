import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";

import { TutorialService } from "../tutorial.service";

import { TutorialEntity } from "../tutorial.entity";

describe("TutorialService", () => {
	let service: TutorialService;

	const mockRepository = {
		save: jest.fn(),
	};

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				TutorialService,
				{
					provide: getRepositoryToken(TutorialEntity),
					useValue: mockRepository,
				},
			],
		}).compile();

		service = module.get<TutorialService>(TutorialService);
	});

	it("should be defined", () => {
		expect(service).toBeDefined();
	});
});
