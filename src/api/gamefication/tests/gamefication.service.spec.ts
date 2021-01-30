import { Test, TestingModule } from "@nestjs/testing";

import { GameficationService } from "../gamefication.service";

describe("GameficationService", () => {
	let service: GameficationService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [GameficationService],
		}).compile();

		service = module.get<GameficationService>(GameficationService);
	});

	it("should be defined", () => {
		expect(service).toBeDefined();
	});
});
