import { Test, TestingModule } from "@nestjs/testing";

import { InterestsResolver } from "../interests.resolver";

describe("InterestsResolver", () => {
	let resolver: InterestsResolver;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [InterestsResolver],
		}).compile();

		resolver = module.get<InterestsResolver>(InterestsResolver);
	});

	it("should be defined", () => {
		expect(resolver).toBeDefined();
	});
});
