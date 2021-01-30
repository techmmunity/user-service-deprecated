import { Test, TestingModule } from "@nestjs/testing";

import { HeadlineResolver } from "../headline.resolver";

describe("HeadlineResolver", () => {
	let resolver: HeadlineResolver;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [HeadlineResolver],
		}).compile();

		resolver = module.get<HeadlineResolver>(HeadlineResolver);
	});

	it("should be defined", () => {
		expect(resolver).toBeDefined();
	});
});
