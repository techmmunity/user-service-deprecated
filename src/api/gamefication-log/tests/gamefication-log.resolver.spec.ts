import { Test, TestingModule } from "@nestjs/testing";

import { GameficationLogResolver } from "../gamefication-log.resolver";

describe("GameficationLogResolver", () => {
	let resolver: GameficationLogResolver;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [GameficationLogResolver],
		}).compile();

		resolver = module.get<GameficationLogResolver>(GameficationLogResolver);
	});

	it("should be defined", () => {
		expect(resolver).toBeDefined();
	});
});
