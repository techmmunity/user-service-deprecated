import { Test, TestingModule } from "@nestjs/testing";

import { GameficationLogService } from "../gamefication-log.service";

describe("GameficationLogService", () => {
	let service: GameficationLogService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [GameficationLogService],
		}).compile();

		service = module.get<GameficationLogService>(GameficationLogService);
	});

	it("should be defined", () => {
		expect(service).toBeDefined();
	});
});
