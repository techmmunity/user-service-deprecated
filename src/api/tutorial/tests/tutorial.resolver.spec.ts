import { Test, TestingModule } from "@nestjs/testing";

import { TutorialResolver } from "../tutorial.resolverr";

describe("TutorialResolver", () => {
	let resolver: TutorialResolver;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [TutorialResolver],
		}).compile();

		resolver = module.get<TutorialResolver>(TutorialResolver);
	});

	it("should be defined", () => {
		expect(resolver).toBeDefined();
	});
});
